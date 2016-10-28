import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Connection } from '../../models';

@Component({
  selector: 'sa-connection-form',
  templateUrl: './connection-form.component.html'
})
export class ConnectionFormComponent implements OnInit {

  @Input() conn: Connection;
  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();

  connectionForm: FormGroup;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.connectionForm = this._formBuilder.group({
      name: [this.conn.name, Validators.required],
      host: [this.conn.host, Validators.required],
      port: [this.conn.port, Validators.required],
      username: this.conn.username,
      privateKey: this.conn.privateKey
    });
  }

  submit() {
    this.onSubmit.emit(this.connectionForm.getRawValue());
  }
}
