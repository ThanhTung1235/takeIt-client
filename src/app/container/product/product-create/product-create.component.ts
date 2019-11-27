import { Component, OnInit, NgZone, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { cloudConfig } from 'src/environments/environment';
import { Gift, ThumbnailResp, Gender } from 'src/app/model/gift';
import { City, District } from 'src/app/model/address';
import { Account } from 'src/app/model/account';
import { Category } from 'src/app/model/category';
import { stringify } from 'querystring';
import { ToastrService } from 'ngx-toastr';
import { GiftService } from 'src/app/service/gift.service';
import { AddressService } from 'src/app/service/address.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CategoryService } from 'src/app/service/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  @Input()
  responses: Array<any>;

  private hasBaseDropZoneOver: boolean = false;
  private uploader: FileUploader;
  private title: string;

  city = new City(0, "");
  district = new District(0, "", "");
  account = new Account(0, "", "", "");
  category = new Category(0, "");
  gift = new Gift(100, "", "", "", 0, 0, "", this.city, this.district, this.account, this.category);
  thumbnailResp: ThumbnailResp[];
  thumbnails: any[] = [];
  thumb: string;
  submitStatus: boolean;

  cities$: Observable<City[]>;
  districts$: Observable<District[]>;
  categories$: Observable<Category[]>;

  constructor(
    private cloudinary: Cloudinary,
    private zone: NgZone,
    private http: HttpClient,
    private toastService: ToastrService,
    private giftService: GiftService,
    private addressService: AddressService,
    private categoriesService: CategoryService,
    private router: Router,
  ) {
    this.responses = [];
    this.title = '';
    this.getCities();
    this.submitStatus = false;
    this.upload();
    this.getCategories();

  }

  ngOnInit(): void {
  }
  upload() {
    // if response.lenght = 3 disable drop zone

    // Create the file uploader, wire it to upload to your account
    const uploaderOptions: FileUploaderOptions = {
      url: `https://api.cloudinary.com/v1_1/${cloudConfig.cloud_name}/upload`,
      // Upload files automatically upon addition to upload queue
      autoUpload: true,
      // Use xhrTransport in favor of iframeTransport
      isHTML5: true,
      // Calculate progress independently for each uploaded file
      removeAfterUpload: true,
      queueLimit: 2,
      // XHR request headers
      headers: [
        {
          name: 'X-Requested-With',
          value: 'XMLHttpRequest'
        }
      ]
    };
    this.uploader = new FileUploader(uploaderOptions);

    this.uploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
      // Add Cloudinary's unsigned upload preset to the upload form
      form.append('upload_preset', cloudConfig.upload_preset);
      // Add built-in and custom tags for displaying the uploaded photo in the list
      let tags = 'myphotoalbum';
      if (this.title) {
        form.append('context', `photo=${this.title}`);
        tags = `myphotoalbum,${this.title}`;
      }
      // Upload to a custom folder
      // Note that by default, when uploading via the API, folders are not automatically created in your Media Library.
      // In order to automatically create the folders based on the API requests,
      // please go to your account upload settings and set the 'Auto-create folders' option to enabled.
      form.append('folder', 'angular_sample');
      // Add custom tags
      form.append('tags', tags);
      // Add file to upload
      form.append('file', fileItem);

      // Use default "withCredentials" value for CORS requests
      fileItem.withCredentials = false;
      return { fileItem, form };
    };

    // Insert or update an entry in the responses array
    const upsertResponse = fileItem => {

      // Run the update in a custom zone since for some reason change detection isn't performed
      // as part of the XHR request to upload the files.
      // Running in a custom zone forces change detection
      this.zone.run(() => {
        // Update an existing entry if it's upload hasn't completed yet

        // Find the id of an existing item
        const existingId = this.responses.reduce((prev, current, index) => {
          if (current.file.name === fileItem.file.name && !current.status) {
            return index;
          }
          return prev;
        }, -1);
        if (existingId > -1) {
          // Update existing item with new data
          this.responses[existingId] = Object.assign(this.responses[existingId], fileItem);
        } else {
          // Create new response
          this.responses.push(fileItem);
        }
      });
    };

    // Update model on completion of uploading a file
    this.uploader.onCompleteItem = (item: any, response: string, status: number, headers: ParsedResponseHeaders) =>
      upsertResponse(
        {
          file: item.file,
          status,
          data: JSON.parse(response)
        }
      );

    // Update model on upload progress event
    this.uploader.onProgressItem = (fileItem: any, progress: any) =>
      upsertResponse(
        {
          file: fileItem.file,
          progress,
          data: {}
        }
      );
  }

  deleteImage = function (data: any, index: number) {
    const url = `https://api.cloudinary.com/v1_1/${cloudConfig.cloud_name}/delete_by_token`;
    const headers = new Headers({ 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest' });
    const options = { headers: headers };
    const body = {
      token: data.delete_token
    };
    this.http.post(url, body, options).subscribe(response => {
      console.log(`Deleted image - ${data.public_id} ${response.result}`);
      // Remove deleted item for responses
      this.responses.splice(index, 1);
    });
  };

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }
  getFileProperties(fileProperties: any) {
    // Transforms Javascript Object to an iterable to be used by *ngFor
    if (!fileProperties) {
      return null;
    }
    return Object.keys(fileProperties)
      .map((key) => ({ 'key': key, 'value': fileProperties[key] }));
  }

  getCities() {
    this.cities$ = this.addressService.getCities().pipe(
      map(x => {
        return x.data;
      })
    );
  }
  onCityChange(city) {
    this.gift.city = city;
    if (city.id > 0) {
      this.submitStatus = true
      this.districts$ = this.addressService.getDistricts(city.id).pipe(
        map(x => { return x.data })
      )
    } else {
      this.submitStatus = false;
    }

  }
  onDistrictChange(district) {
    if (district.id > 0) {
      this.submitStatus = true
    } else {
      this.submitStatus = false;
    }
    this.gift.district = district;
  }
  onAgeChange(event) {
    if (event > 0) {
      this.submitStatus = true
    } else {
      this.submitStatus = false
    }
    this.gift.age_range = event;
  }
  onGenderChange(event) { 
    console.log(event);
    // if (event > 0) {
    //   this.submitStatus = true
    // } else {
    //   this.submitStatus = false
    // }
    // this.gift.category = event
  }

  onCateChange(event){
    this.gift.category = event;
    console.log(event);
  }
  getCategories() {
    this.categories$ = this.categoriesService.getAll().pipe(map(x => {
      return x.data;
    }));
  }

  submit() {
    let thumb1 = '';
    let thumb2 = '';
    let thumb3 = '';
    console.log(this.responses.length);
    if (this.responses.length == 0 || this.responses.length < 3) {
      this.responses = [];
      this.toastService.error('Bạn phải thêm ảnh vào sản phẩm');
      return;
    }
    this.responses.forEach(element => {
      this.thumbnails.push(element.data.url);
    });
    thumb1 = this.thumbnails[0];
    thumb2 = this.thumbnails[1];
    thumb3 = this.thumbnails[2];
    this.thumb = thumb1.concat(",", thumb2, ",", thumb3);
    this.gift.thumbnail = this.thumb;

    if (this.submitStatus) {
      this.giftService.saveGift(this.gift).subscribe(x => {
        if (x.status === 201) {
          this.router.navigate(['/products'])
          this.toastService.success('Sản phẩm của bạn đăng thành công và đang chờ để được duyệt', '', {
            positionClass: 'toast-top-full-width',
            timeOut: 3000
          })
        } else {
          this.toastService.error('Lỗi hệ thống', '', {
            positionClass: 'toast-top-full-width',
            timeOut: 3000
          })
        }
      })
    } else {
      this.toastService.error('Hãy xem lại các trường nhập ở trên', '', {
        positionClass: 'toast-top-full-width',
        timeOut: 3000
      })
    }

  }
}


