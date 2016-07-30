import {Component} from '@angular/core';

@Component({
  selector: 'upload-page',
  template: `
  <div>
    <form ngNoForm
          method="POST"
          action="/api/v1/upload"
          enctype="multipart/form-data">
      <input name="file" type="file" />
      <button type="submit">Upload</button>
    </form>
  </div>
  `
})
export class UploadRoute {}