import { LightningElement, api, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class TableContent extends NavigationMixin(LightningElement) {
    @api contact    
    @api contactid

    deleteButtonHandler(event){
        this.dispatchEvent(new CustomEvent('openmodal', {detail: this.contactid}))
    }

    handleRedirectToAccountPage(event) {
        let accountId = event.target.getAttribute('account-id')
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: accountId,
                objectApiName: 'Account',
                actionName: 'view'
            },
        });
    }
}