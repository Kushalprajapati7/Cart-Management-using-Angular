import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent {
  profileForm: any = {};
  name!: string;
  email!: string;
  gender!: string;
  dob!: Date;
  profiles: any = [];
  creatingProfile: boolean = true;
  constructor(private router: Router, private profileService: ProfileService) { }


  ngOnInit(): void {
    this.loadProfiles();
  }

  loadProfiles(): void {
    this.profileService.getProfiles().subscribe(
      profiles => {
        this.profiles = profiles;
        console.log(profiles);
      },
      error => {
        console.error('Error fetching profiles', error);
      }
    );
  }

  // OnCreateProfile(): void {
  //   this.creatingProfile = true;
  //   const { name, email, dob, gender } = this.profileForm;
  //   this.profileService.createProfile(name, email, dob, gender).subscribe(
  //     response => {
  //       console.log('Profile created successfully', response);
  //       this.router.navigate(['/profile']);
  //     },
  //     error => {
  //       console.error('Error creating profile', error);
  //     }
  //   );
  // }

  // OnUpdateProfile(profile:any): void {
  //   this.profileForm = { ...profile };
  //   this.creatingProfile = false;
  //   const { id, ...updatedProfileData } = this.profileForm; 
  //   console.log(id);

  //   this.profileService.updateProfile(id, updatedProfileData).subscribe(
  //     response => {
  //       console.log('Profile updated successfully', response);
  //       this.router.navigate(['/profile']);
  //     },
  //     error => {
  //       console.error('Error updating profile', error);
  //     }
  //   );
  // }

 
  OnSubmitProfile(): void {
    if (this.creatingProfile) {
      this.createProfile();
    } else {
      this.updateProfile();
    }
  }
  
  private createProfile(): void {
    console.log("create method");
    
    this.creatingProfile = true;
    const { name, email, dob, gender } = this.profileForm;
    console.log("form data",this.profileForm);
    this.profileService.createProfile(name, email, dob, gender).subscribe(
      response => {
        console.log('Profile created successfully', response);
        this.profiles.push(response);
        this.profileForm = {}
        this.router.navigate(['/profile']);
      },
      error => {
        console.error('Error creating profile', error);
      }
    );
  }
  
 
  OnUpdateProfile(profile: any): void {
    // const id = this.profileForm._id;
    // this.router.navigate([`/profile/${id}`]);
    this.profileForm = profile
    console.log("P", profile);
    this.creatingProfile = false;
  }


  private updateProfile(): void {
    const id = this.profileForm._id;
    const { ...updatedProfileData } = this.profileForm;
    console.log(id,"update ");
    this.profileService.updateProfile(id, updatedProfileData).subscribe(
      response => {
        console.log('Profile updated successfully', response);
        this.profileForm = {}
        this.router.navigate(['/profile']);
        this.creatingProfile = true;
      },
      error => {
        console.error('Error updating profile', error);
      }
    );
  }


  OndeletProfile(profile: any): void {
    this.profileForm = profile
    const id = profile._id;
    console.log(id);

    this.profileService.deleteProfile(id).subscribe(
      response => {
        console.log('Profile deleted successfully', response);
        this.profiles = this.profiles.filter((p: { _id: any; }) => p._id !== profile._id);
        this.router.navigate(['/profile']);
      }, error => {
        console.error('Error deleting profile', error);
      });
  }

  VisitProduts(profile:any): void {
    this.profileForm = profile
    const id = profile._id;
    localStorage.setItem('profileID', id);
    console.log(id);
    
    this.router.navigate([`/product`]);
  }


}
