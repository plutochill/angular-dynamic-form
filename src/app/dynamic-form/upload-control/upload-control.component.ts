import { AfterContentInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-upload-control',
  templateUrl: './upload-control.component.html',
  styleUrls: ['./upload-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi:true,
      useExisting: UploadControlComponent
    }
  ]
})
export class UploadControlComponent implements OnChanges, AfterContentInit {
  
  //string 例如：'http://ks3-cn-beijing.ksyun.com/jns.img.bucket/xxx.png'
  //json   例如："[{\"url\":\"http://ks3-cn-beijing.ksyun.com/jns.img.bucket/xxx.jpg\"}]"
  @Input() fileType: 'string' | 'json' = 'string';
  @Input() alowType = { value: 'image/png,image/jpeg,image/jpg', label: 'png、jpeg、jpg' };
  @Input() fileSize: number = 10; //单位 MB
  @Input() limit: number = 1;
  @Input() placeholder = '文件上传';

  value: string;
  loading = false;
  fileList: NzUploadFile[] = [];

  onChange = (valueArrayStr: string) => {};
  onTouched = () => {};
  touched = false;
  disabled = false;


  constructor(private notification: NzNotificationService) { }
  
  ngAfterContentInit(): void {
    if (this.fileType === 'string') {
      this.limit = 1;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.value && !changes.value?.firstChange) {
      this.writeValue(changes.value.currentValue);
    }
  }


  beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]) => {
    return new Observable((observer: Observer<boolean>) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.notification.error('Error!', 'You can only upload JPG file!');
        observer.complete();
        return;
      }
      const isLt2M = file.size! / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.notification.error('Error!', 'Image must smaller than 2MB!');
        observer.complete();
        return;
      }
      observer.next(isJpgOrPng && isLt2M);
      observer.complete();
    });
  };

  handleChange(info: { file: NzUploadFile, type: string }): void {

    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        console.log(info.file)
        if (this.fileType === 'string') {
          this.fileList = [
            { 
              uid: info.file.uid,
              name: info.file.name,
              status: 'done',
              thumbUrl: info.file.thumbUrl,
              url: info.file.response.data.url,
            }
          ];
          this.value = info.file.response.data.url;
          this.onChange(this.value);
        }
        if (this.fileType === 'json') {
          this.fileList.push({ 
            uid: info.file.uid,
            name: info.file.name,
            status: 'done',
            thumbUrl: info.file.thumbUrl,
            url: info.file.response.data.url,
          });
          const valueArray = this.fileList.map(item => { return { url: item.url }});
          const valueArrayStr = JSON.stringify(valueArray);
          this.value = valueArrayStr;
          this.onChange(this.value)
        }
        break;

      case 'removed':
        if (this.fileType === 'string') {
          this.fileList = [];
          this.value = '';
          this.onChange(this.value);
        }
        if (this.fileType === 'json') {
          this.fileList = this.fileList.filter(item => item.url !== info.file.url);
          const valueArray = this.fileList.map(item => item.url);
          const valueArrayStr = JSON.stringify(valueArray);
          this.value = valueArrayStr;
          this.onChange(this.value)
        }
        break;

      case 'error':
        if (info.file.status === 'error') {
          this.notification.error('Error!', 'Network error');
          this.loading = false;
        }
        break;
    }
  }


  writeValue(value: string) {
    if (!value) { return }

    if (this.fileType === 'string') {
      // check value is string or json string
      if (value.startsWith('[') && value.endsWith(']')) {
        const valueArray = JSON.parse(value);
        if (valueArray.length > 0) {
          this.fileList = [
            {
              uid: '-1',
              name: 'xxx.png',
              status: 'done',
              url: valueArray[0].url,
            }
          ];
        }
      } else {
        this.fileList = [
          {
            uid: '-1',
            name: 'xxx.png',
            status: 'done',
            url: value,
          }
        ];
      }
    }
    if (this.fileType === 'json') {
      // check value is string or json string
      if (value.startsWith('[') && value.endsWith(']')) {
        const valueArray = JSON.parse(value);
        this.fileList = valueArray;
      } else {
        this.fileList = [
          {
            uid: '-1',
            name: 'xxx.png',
            status: 'done',
            url: value,
          }
        ];
      }
    }


  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

}
