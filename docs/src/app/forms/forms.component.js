import {Component} from '@angular/core';

export default  class FormsComponent {
  static get annotations() {
    return [
      new Component({
        template: require('./forms.html')
      })
    ];
  }
  constructor(){
    this.Selectpicker1 = [];
    this.forms1 = `
    <form>
      <div class="form-group">
        <label for="ExampleInputLogin1">Login</label>
        <input type="text" class="form-control" id="ExampleInputLogin1" placeholder="Login">
      </div>
      <div class="form-group">
        <label for="ExampleInputPassword1">Password</label>
        <input type="password" class="form-control" id="ExampleInputPassword1" placeholder="Password">
      </div>
      <div class="checkbox">
        <input type="checkbox" id="ExampleCheckbox1">
        <label for="ExampleCheckbox1">Remember me</label>
      </div>
      <button type="submit" class="btn btn-default">Connection</button>
    </form>`;
    this.forms2 = `
    <form class="form-inline">
      <div class="form-group">
        <label for="ExampleInputSearch1">Search</label>
        <input type="text" class="form-control" id="ExampleInputSearch1" placeholder="Search">
      </div>
      <div class="form-group">
        <label for="ExampleSelectpicker1">Filter</label>
        <atlui-selectpicker name="ExampleSelectpicker1" [(ngModel)]="Selectpicker1" multiple="true">
          <atlui-selectpicker-option [value]="name">name</atlui-selectpicker-option>
          <atlui-selectpicker-option [value]="surname">surname</atlui-selectpicker-option>
          <atlui-selectpicker-option [value]="place">place</atlui-selectpicker-option>
          <atlui-selectpicker-option [value]="age">age</atlui-selectpicker-option>
        </atlui-selectpicker>
      </div>
      <button type="submit" class="btn btn-default">Search</button>
    </form>`;
    this.forms3 = `
    <form class="form-horizontal">
      <div class="form-group">
        <label for="ExampleInputEmail1" class="col-md-3 control-label">Email</label>
        <div class="col-md-9">
          <input type="email" class="form-control" id="ExampleInputEmail1" placeholder="Email">
        </div>
      </div>
      <div class="form-group">
        <label for="ExampleInputEmail2" class="col-md-3 control-label">Confirm Email</label>
        <div class="col-md-9">
          <input type="email" class="form-control" id="ExampleInputEmail2" placeholder="Confirm Email">
        </div>
      </div>
      <div class="form-group">
        <label for="ExampleInputLogin2" class="col-md-3 control-label">Login</label>
        <div class="col-md-9">
          <input type="text" class="form-control" id="ExampleInputLogin2" placeholder="Login">
        </div>
      </div>
      <div class="form-group">
        <label for="ExampleInputPassword2" class="col-md-3 control-label">Password</label>
        <div class="col-md-9">
          <input type="text" class="form-control" id="ExampleInputPassword2" placeholder="Password">
        </div>
      </div>
      <div class="form-group">
        <label for="ExampleRadioGender" class="col-md-3 control-label">Gender</label>
        <div class="col-md-9">
          <div class="radio-inline">
            <input type="radio" name="ExampleRadioGender" id="inlineRadio1" value="Male" [(ngModel)]="Gender">
            <label for="inlineRadio1">Male</label>
          </div>
          <div class="radio-inline">
            <input type="radio" name="ExampleRadioGender" id="inlineRadio2" value="Female" [(ngModel)]="Gender">
            <label for="inlineRadio2">Female</label>
          </div>
        </div>
      </div>
      <div class="form-group">
        <div class="col-sm-offset-2 col-md-10">
          <button type="submit" class="btn btn-default">Register</button>
        </div>
      </div>
    </form>`;
  }
}


FormsComponent.parameters = [];
