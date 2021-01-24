import { LightningElement, track, wire } from 'lwc';
import getAccounts from '@salesforce/apex/accountController.getAccounts'
import createContact from '@salesforce/apex/contactController.createContact'
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CreateContactModalBox extends LightningElement {
    @track firstName
    @track lastName
    @track email
    @track mobilePhone
    @track accountId
    @track accounts
    
    @wire(getAccounts) accountsHandler({data, error}){
        if(error){
            throw Exception('Cant get Accounts');
        }
        this.accounts = data
    }

    firstNameChangeHandler(event){
        this.firstName = event.target.value
    }

    lastNameChangeHandler(event){
        this.lastName = event.target.value
    }
    
    emailNameChangeHandler(event){
        this.email = event.target.value
    }

    mobilePhoneChangeHandler(event){
        this.mobilePhone = event.target.value
    }

    accountIdChangeHandler(event){
        this.accountId = event.target.value
    }

    closeButtonHandler(){
        this.dispatchEvent(new CustomEvent('close'))
    }

    saveButtonHandler(){
        let formButton = this.template.querySelector('.createFormButton')
        formButton.click()
    }

    dispatchSuccessToast(){
        const event = new ShowToastEvent({
            title: 'Creation feedback',
            message: 'Contact was created',
            variant: 'success',
            mode: 'dismissable'
        });
        this.dispatchEvent(event);
    }

    dispatchErrorToast(){
        const event = new ShowToastEvent({
            title: 'Creation feedback',
            message: 'Contact was not created',
            variant: 'error',
            mode: 'dismissable'
        });
        this.dispatchEvent(event);
    }

    createNewContact(){
        createContact({
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            mobilePhone: this.mobilePhone,
            accountId: this.accountId
        })
        .then((result) => {
            this.dispatchSuccessToast()
            this.dispatchEvent(new CustomEvent('createcontact'))
        })
        .catch((error) => {
            this.dispatchErrorToast()
            console.log(error)
        })
    }
}