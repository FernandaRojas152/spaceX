import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { LaunchSpaceX } from '../launch-space-x';
import { LaunchesService } from '../launches.service';
import { LaunchDetailComponent } from './launch-detail.component';

/* describe('LaunchDetailComponent', () => {
  let component: LaunchDetailComponent;
  let fixture: ComponentFixture<LaunchDetailComponent>;
  const route = {
    snapshot: {
      params: { id: '1' }
    }
  };
  const mockLaunch: LaunchSpaceX = {
    "flight_number": 1,
    "mission_name": "DemoSat",
    "launch_year": "2007",
    "rocket": {
      "rocket_name": "Falcon 1",
    },
    "launch_site": {
      "site_name": "Kwajalein Atoll",
    },
    "links": {
      "mission_patch": "https://images2.imgbox.com/be/e7/iNqsqVYM_o.png",
      "mission_patch_small": "https://images2.imgbox.com/4f/e3/I0lkuJ2e_o.png",
      "youtube_id": "Lk4zQ2wP-Nc",
    },
    "details": "Successful first stage burn and transition to second stage, maximum altitude 289 km, Premature engine shutdown at T+7 min 30 s, Failed to reach orbit, Failed to recover first stage",
  };


  beforeEach(async () => {
    const spy = jasmine.createSpyObj('LaunchesService', ['updateLaunch']);
    await TestBed.configureTestingModule({
      declarations: [LaunchDetailComponent],
      imports: [RouterTestingModule, ReactiveFormsModule, FormsModule, HttpClientTestingModule],
      providers: [
        { provide: LaunchesService},
        { provide: ActivatedRoute, useValue: route}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LaunchDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
 */