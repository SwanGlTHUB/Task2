public with sharing class accountController {
    
    static final Integer MAX_ACCOUNTS = 100;

    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts() {
        List<Account> accounts;
        accounts = [
            SELECT Name, Id
            FROM Account
            LIMIT :MAX_ACCOUNTS
        ];
        
        return accounts;
    }
}
