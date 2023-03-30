import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { InfoSpaceX } from './info-space-x';
import { LaunchSpaceX } from './launch-space-x';

import { LaunchesService } from './launches.service';

describe('LaunchesService', () => {
  let service: LaunchesService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LaunchesService]
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new LaunchesService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  describe('IsFavorite', () => {
    it(`should be true if the id is favorite`, () => {
      const favoriteId = 2;
      service.favorite = favoriteId;
      const results = service.isFavorite(favoriteId);
      expect(results).toBeTrue();
    });

    it(`should be false if the id is favorite`, () => {
      const favoriteId = 2;
      service.favorite = favoriteId;
      const results = service.isFavorite(9);
      expect(results).toBeFalse();
    });
  });

  describe('addFavorite', () => {
    it('should add the favorite if the id is correct', () => {
      const favoriteId = 2;
      service.addFavorite(favoriteId);
      expect(service.favorite).toEqual(favoriteId);
    })
    it(`shouldn't add the favorite if the id is not valid`, () => {
      service.addFavorite(null);
      expect(service.favorite).toBeNull();
    })
  });

  describe('getInfo', () => {
    it('should retrieve info from the API', fakeAsync(() => {
      const mockInfo: InfoSpaceX = {
        name: 'SpaceX',
        founder: 'Elon Musk',
        summary: 'SpaceX designs, manufactures and launches advanced rockets and spacecraft. The company was founded in 2002 to revolutionize space technology, with the ultimate goal of enabling people to live on other planets.'
      };
      httpClientSpy.get.and.returnValue(of(mockInfo));
      service.getInfo().subscribe(data => {
        expect(data).toEqual(mockInfo);
      });
    }));
  });

  describe('getLaunch', () => {
    it('should retrieve one launch from the API if the number exists', fakeAsync(() => {
      const id = 2;
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

      httpClientSpy.get.and.returnValue(of(mockLaunch));
      service.getLaunch(id).subscribe(launch => {
        expect(launch).toEqual(mockLaunch);
      });
    }));

    it('shouldn\'t retrieve a launch if the id doesn\'t exists', fakeAsync(() => {
      const id = 999;
      const mockError = new HttpErrorResponse({
        error: 'Not Found',
        status: 404, statusText: 'Not Found'
      });
      httpClientSpy.get.and.returnValue(throwError(() => mockError));
      service.getLaunch(id).subscribe({
        error: error => {
          expect(error.message).toContain('Not Found');
          expect(error.status).toEqual(404);
        }
      });
    }));
  });

  describe('updateLaunch', () => {
    it('should update the launch if the id exists', fakeAsync(() => {
      const id = 2;
      const mockLaunches: LaunchSpaceX[] = [{
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
      }];
      const expectedLaunch: LaunchSpaceX = {
        "flight_number": 2,
        "mission_name": "Fer",
        "launch_year": "2001",
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
      service.launches= mockLaunches;
      service.updateLaunch(id, expectedLaunch);
      expect(service.launches[0].mission_name).toEqual(expectedLaunch.mission_name);
    }));

    it('shouldn\'t update the launch if the id doesn\'t exists', fakeAsync(() => {
      const id = 999;
      const mockLaunches: LaunchSpaceX[] = [{
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
      }];
      const expectedLaunch: LaunchSpaceX = {
        "flight_number": 2,
        "mission_name": "Fer",
        "launch_year": "2001",
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
      service.launches= mockLaunches;
      service.updateLaunch(id, expectedLaunch);
      expect(service.launches[0].mission_name).toEqual("DemoSat");
    }));
  });
});