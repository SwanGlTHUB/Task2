import { LightningElement } from 'lwc';

export default class DeleteModalBox extends LightningElement {
    closeHandler(){
        this.dispatchEvent(new CustomEvent('close'))
    }
    deleteHandler(){
        this.dispatchEvent(new CustomEvent('delete'))
    }
}