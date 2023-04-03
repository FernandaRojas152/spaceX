import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { LaunchSpaceX } from '../launch-space-x';
import { LaunchesService } from '../launches.service';
import { LaunchesComponent } from './launches.component';

describe('LaunchesComponent', () => {
  let component: LaunchesComponent;
  let fixture: ComponentFixture<LaunchesComponent>;
  let service: LaunchesService;
  const mockLaunch: LaunchSpaceX = {
    "flight_number": 2,
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

  const mockLaunches: LaunchSpaceX[] = [mockLaunch, { ...mockLaunch, flight_number: 3, mission_name: 'Test' }];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [LaunchesComponent],
      providers: [LaunchesService]
    }).compileComponents();

    fixture = TestBed.createComponent(LaunchesComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(LaunchesService);
    fixture.detectChanges();
  });

  it('should create the launches component', () => {
    expect(component).toBeTruthy();
  });

  describe('GetLaunchesArray()', () => {
    it('should call getLaunches() method of LaunchesService when getLaunchesArray() is called', () => {
      const getLaunchesSpy = spyOn(service, 'getLaunches').and.callThrough();
      component.getLaunchesArray();
      expect(getLaunchesSpy).toHaveBeenCalled();
      expect(component.launchesArray).not.toBeNull();
    });
  });

  describe('GoToLaunch()', () => {
    it('should go to the detail Launch if the id is correct or exists', () => {
      const router = TestBed.inject(Router);
      const navigateSpy = spyOn(router, 'navigate');
      component.goToLaunch(mockLaunch);
      expect(navigateSpy).toHaveBeenCalledWith(['detail', mockLaunch.flight_number]);
    });
  });

  describe('isFavorite()', () => {
    it('should call the isFavorite() method of LaunchesService if the id is correct', () => {
      const isFavoriteSpy = spyOn(service, 'isFavorite');
      component.isFavorite(mockLaunch);
      expect(isFavoriteSpy).toHaveBeenCalledWith(mockLaunch.flight_number);
    });
  });

  describe('addFavorite()', () => {
    it('should add a favorite in the LaunchesService addFavorite() if the id is correct', () => {
      const addFavoriteSpy = spyOn(service, 'isFavorite');
      component.addFavorite(mockLaunch);
      expect(addFavoriteSpy).toHaveBeenCalledWith(mockLaunch.flight_number);
      expect(service.favorite).toEqual(mockLaunch.flight_number);
    });
  });

  describe('orderByFavorite()', ()=>{
    it('should order the launches list if a favorite is selected', ()=>{
      component.addFavorite(mockLaunch);
    })

  });
});
