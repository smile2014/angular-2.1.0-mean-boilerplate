import {Component} from 'angular2/core';

@Component({
  selector: 'upload-page',
  template: `
  <form ngNoForm
        method="POST"
        action="/upload"
        enctype="multipart/form-data">
    <input name="name" type="text" />
    <input name="file" type="file" />
    <button type="submit">Upload</button>
  </form>
  `
})
export class UploadPage {}