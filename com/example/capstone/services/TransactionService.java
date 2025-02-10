public TransactionResponse createTransaction(TransactionRequest transactionRequest) {
    TransactionEntity transactionEntity = new TransactionEntity();
    transactionEntity.setAmount(transactionRequest.getAmount());
    transactionEntity.setStatus(transactionRequest.getStatus());
    transactionEntity.setCreatedAt(LocalDateTime.now());
    
    // Set user if userId is provided
    if (transactionRequest.getUserId() != null) {
        UserEntity userEntity = userRepository.findById(transactionRequest.getUserId())
            .orElseThrow(() -> new RuntimeException("User not found: " + transactionRequest.getUserId()));
        transactionEntity.setUser(userEntity);
    }

    // If cardId is provided, perform card-related checks
    if (transactionRequest.getCardId() != null) {
        CardEntity card = cardRepository.findById(transactionRequest.getCardId())
            .orElseThrow(() -> new RuntimeException("Card not found: " + transactionRequest.getCardId()));
        transactionEntity.setCard(card);

        // Only perform card-related checks if a card is involved
        if(card.getClosed()) {
            transactionEntity.setStatus("failed");
            transactionEntity.setDescription("Card is closed");
            return new TransactionResponse(transactionRepository.save(transactionEntity));
        }

        if(card.getPaused()) {
            transactionEntity.setStatus("failed");
            transactionEntity.setDescription("Card is paused");
            return new TransactionResponse(transactionRepository.save(transactionEntity));
        }

        // Card type checks
        switch(card.getCardType()) {
            case "CATEGORY_LOCKED":
                if(!card.getCategoryName().equals(transactionEntity.getMerchantName())) {
                    transactionEntity.setStatus("failed");
                    transactionEntity.setDescription("Transaction is not within the category");
                    return new TransactionResponse(transactionRepository.save(transactionEntity));
                }
                break;
            case "LOCATION_LOCKED":
                // TODO: Implement location check
                transactionEntity.setStatus("success");
                transactionEntity.setDescription("Transaction is within the location");
                break;
            case "MERCHANT_LOCKED":
                if(!card.getMerchantName().equals(transactionEntity.getMerchantName())) {
                    transactionEntity.setStatus("failed");
                    transactionEntity.setDescription("Transaction is not within the merchant");
                    return new TransactionResponse(transactionRepository.save(transactionEntity));
                }
                break;
            case "BURNER":
                if(card.getRemainingLimit() < transactionEntity.getAmount()) {
                    transactionEntity.setStatus("failed");
                    transactionEntity.setDescription("Transaction is not within the spending limit");
                    return new TransactionResponse(transactionRepository.save(transactionEntity));
                }
                break;
            default:
                transactionEntity.setStatus("failed");
                transactionEntity.setDescription("Card type is invalid");
                return new TransactionResponse(transactionRepository.save(transactionEntity));
        }

        // Check spend limits
        if(card.getPer_transaction() != null && card.getPer_transaction() < transactionEntity.getAmount()) {
            transactionEntity.setStatus("failed");
            transactionEntity.setDescription("Transaction is not within the per transaction limit");
            return new TransactionResponse(transactionRepository.save(transactionEntity));
        }

        // Update card limits
        card.setRemainingLimit(card.getRemainingLimit() - transactionEntity.getAmount());
        if(card.getCardType().equals("BURNER")) {
            card.setClosed(true);
        }
        cardRepository.save(card);
    } else {
        // For transactions without a card (e.g., PayPal, direct payment)
        transactionEntity.setStatus("success");
        transactionEntity.setDescription(transactionRequest.getDescription());
        if (transactionRequest.getMerchantName() != null) {
            transactionEntity.setMerchantName(transactionRequest.getMerchantName());
        }
        if (transactionRequest.getType() != null) {
            transactionEntity.setType(transactionRequest.getType());
        }
    }

    return new TransactionResponse(transactionRepository.save(transactionEntity));
} 