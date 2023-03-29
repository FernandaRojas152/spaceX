import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { InfoSpaceX } from './info-space-x';

import { LaunchesService } from './launches.service';

describe('LaunchesService', () => {
  let service: LaunchesService;
  let httpMock: HttpTestingController;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LaunchesService]
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    /* service = TestBed.inject(LaunchesService);
    httpMock = TestBed.inject(HttpTestingController); */
    service= new LaunchesService(httpClientSpy);
  });

  /* afterEach(() => {
    httpMock.verify();
  }); */

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  
  describe('IsFavorite', ()=>{
    it(`should be true if the id is favorite`, ()=>{
      const favoriteId= 2;
      service.favorite= favoriteId;
      const results= service.isFavorite(favoriteId);
      expect(results).toBeTrue();
    });

    it(`should be false if the id is favorite`, ()=>{
      const favoriteId= 2;
      service.favorite= favoriteId;
      const results= service.isFavorite(9);
      expect(results).toBeFalse();
    });
  });

  describe('addFavorite', ()=>{
    it('should add the favorite if the id is correct', ()=>{
      const favoriteId= 2;
      service.addFavorite(favoriteId);
      expect(service.favorite).toEqual(favoriteId);
    })
    it(`shouldn't add the favorite if the id is not valid`, ()=>{
      service.addFavorite(null);
      expect(service.favorite).toBeNull();
    })
  });

  describe('getInfo', ()=>{
    it('should retrieve info from the API', (done: DoneFn) => {
      const mockInfo: InfoSpaceX = {
        name: 'SpaceX',
        founder: 'Elon Musk',
        summary: 'SpaceX designs, manufactures and launches advanced rockets and spacecraft. The company was founded in 2002 to revolutionize space technology, with the ultimate goal of enabling people to live on other planets.'
      };
      httpClientSpy.get.and.returnValue(of(mockInfo));
      service.getInfo().subscribe(data=> {
        expect(data).toEqual(mockInfo);
        done();
      });
    });
  });

/*   describe('getLaunches', ()=>{

  }); */
});