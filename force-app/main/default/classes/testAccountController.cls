@isTest public with sharing class testAccountController {
    
    @isTest public static void testGetAccounts(){
        Test.startTest();
        Account acc = new Account(Name = 'Swan');
        insert acc;
        List<Account> allAccounts = accountController.getAccounts();
        System.assertEquals(1, allAccounts.size());
        System.assertEquals(acc.id, allAccounts[0].id);
        Test.stopTest();
    }
}
