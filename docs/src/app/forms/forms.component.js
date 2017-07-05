import {Component} from '@angular/core';

export default  class FormsComponent {
  static get annotations() {
    return [
      new Component({
        template: require('./forms.html')
      })
    ]
  }
  constructor(){

    this.formHtml = `
    <form>
      <div class='row'>
        <div class='col-md-4'>
          <div class="form-group">
            <label for="ExamplePassword">Password</label>
            <input type="text" class="form-control" id="ExampleUsername" placeholder="Username" [(ngModel)]="person.username" name="ExampleUsername"/>
          </div>
        </div>  
        <div class='col-md-4'>
          <div class="form-group">
              <selectpicker [(ngModel)]="person.Language" multiple="true" name="ExampleLanguage">
                <selectpicker-option value="English">English</selectpicker-option>
                <selectpicker-option value="French">French</selectpicker-option>
                <selectpicker-option value="Spanish">Spanish</selectpicker-option>
              </selectpicker>
          </div>
        </div>  
        <div class='col-md-4'> 
          <div class="form-group">
            <label for="ExampleBirthday">Birthday</label>
            <div class="radio">
              <input type="radio" id="radio3" name="radioset3" value="Male">
              <label for="radio3">
                Male
              </label>
            </div>
            <div class="radio">
              <input type="radio" id="radio4" name="radioset3" value="Female" checked="">
              <label for="radio4">
                Female
              </label>
            </div>
          </div>
        </diV>  
      </div> 
    </form>`

    this.person = {}

    this.Display = "Example";
    this.start1 = "2017-05-01";
    this.end1 = "2017-05-22";
    this.options1 = {
      type: "header"
    }

    this.options2 = {
      type: "divider"
    }
    this.Selectpicker2 = "French";
    this.input2 = "test2";
    
  }
}


FormsComponent.parameters = [];
