@isTest public with sharing class testContactController {

    @isTest private static void testCreateContact(){
        String hash = '54cc5e23863426c895f415c44eed8de2ad13b3ee285bd77db53e06b76e6';
        Account someAccount = new Account(Name = 'kefaa');

        Test.startTest();
        insert someAccount;
        contactController.createContact('Vanya', hash, 'sobaka@gmail.com', '+123412312', String.valueOf(someAccount.id));
        List<Contact> simmilarContact = [
            SELECT LastName
            FROM Contact
            WHERE LastName = :hash
        ];
        System.assertEquals(true, simmilarContact.size() == 1);
        Test.stopTest();
    }

    @isTest private static void testDeleteContact(){
        Contact testContact = new Contact(LastName = 'Hulin');
        
        Test.startTest();
        insert testContact;
        contactController.deleteContact(testContact.id);
        List<Contact> tryToFindContact = [
            SELECT id
            FROM Contact
            WHERE id = :testContact.id
        ];
        System.assertEquals(true, tryToFindContact.size() == 0);
        Test.stopTest();
    }

    @isTest private static void testGetAllContacts(){
        Test.startTest();
        //Create and insert Accounts
        Account firstAccount = new Account(Name = 'abc');
        List<Account> accounts = new List<Account>();
        accounts.add(firstAccount);
        insert accounts;

        //Create and insert Contacts
        Contact firstContact = new Contact(Email = 'a@gmail.com', MobilePhone = '123',
                                           AccountId = firstAccount.id, Account = firstAccount, FirstName = 'Misha', LastName = 'Lebed');
        List<Contact> contacts = new List<Contact>();
        contacts.add(firstContact);
        insert contacts;
        List<Contact> returnedList = contactController.getAllContacts();
        System.assertEquals(contacts[0].id, returnedList[0].id);
        Test.stopTest();
    }

    @isTest private static void testNoAccountLinked(){
        Test.startTest();
        Contact contact = new Contact(Email = 'a@gmail.com', MobilePhone = '123', FirstName = 'Misha', LastName = 'Lebed');
        List<Contact> contacts = new List<Contact>();
        contacts.add(contact);
        insert contacts;
        List<Contact> returnedList = contactController.getAllContacts();
        System.assertEquals(contacts[0].id, returnedList[0].id);
        Test.stopTest();
    }
}
