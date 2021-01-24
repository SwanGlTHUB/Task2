import { LightningElement, wire, track } from 'lwc';
import getAllContacts from "@salesforce/apex/contactController.getAllContacts";
import deleteContact from '@salesforce/apex/contactController.deleteContact'
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import {refreshApex} from '@salesforce/apex';

export default class Table extends LightningElement {
    @track allContacts
    @track contactsToDisplay
    @track filterInputValue = ''
    @track modalContactId
    @track openDeletionModal = false
    @track openCreationModal = false
    @track contactsResponse

    @wire(getAllContacts) contactsHandler(response) {
        if (response.error) {
            throw Exception('Cant get Contacts');
        }
        this.allContacts = response.data
        if(this.allContacts){
            this.contactsToDisplay = this.allContacts.filter((item) => this.contactCouldBeDisplayed(item))
        }
        this.contactsResponse = response
    }

    contactCouldBeDisplayed(contact){
        console.log(this.filterInputValue)
        if(!contact.hasOwnProperty('FirstName')){
            if(this.filterInputValue.length === 0){
                return true
            }
            return false
        }
        if (contact.FirstName.toLowerCase().search(this.filterInputValue) === -1) {
            return false
        } else {
            return true
        }
    }

    switchDeletionModalState(){
        this.openDeletionModal = !this.openDeletionModal
    }

    openDeletionModalHandler(event){
        this.modalContactId = event.detail
        this.switchDeletionModalState()
    }
    
    creationAccountHandler(){
        this.switchCreationModalState()
        refreshApex(this.contactsResponse)
    }

    switchCreationModalState(){
        this.openCreationModal = !this.openCreationModal
    }

    openCreationModalHandler(event){
        this.switchCreationModalState()
    }

    dispatchSuccessToast(){
        const event = new ShowToastEvent({
            title: 'Deletion feedback',
            message: 'Contact was deleted',
            variant: 'success',
            mode: 'dismissable'
        });
        this.dispatchEvent(event);
    }

    dispatchErrorToast(){
        const event = new ShowToastEvent({
            title: 'Deletion feedback',
            message: 'Contact was not deleted',
            variant: 'error',
            mode: 'dismissable'
        });
        this.dispatchEvent(event);
    }

    deleteContactHandler(){
        deleteContact({contactId : this.modalContactId})
        .then((result) => {
            let badId = this.modalContactId
            this.contactsToDisplay = this.contactsToDisplay.filter(function(item){
                return item.Id != badId
            })
            this.allContacts = this.allContacts.filter(function(item){
                return item.Id != badId
            })
            this.dispatchSuccessToast()
        })
        .catch((error) => {
            console.log(error)
            this.dispatchErrorToast()
        })
        this.switchDeletionModalState()
    }

    filterContactsByNamePrefix() {
        let newContactsToDisplay = []
        this.allContacts.forEach((item) => {
            if(this.contactCouldBeDisplayed(item)){
                newContactsToDisplay.push(item)
            }
        })
        this.contactsToDisplay = newContactsToDisplay
    }

    handleInputChange(event) {
        this.filterInputValue = event.target.value.toLowerCase()
    }

    handleFilterButton() {
        this.filterContactsByNamePrefix()
    }
}