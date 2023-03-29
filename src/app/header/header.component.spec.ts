import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HeaderComponent } from './header.component';
import { LaunchesService } from '../launches.service';
import { of } from 'rxjs';
import { InfoSpaceX } from '../info-space-x';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [HeaderComponent],
      providers: [LaunchesService],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the header component', () => {
    expect(component).toBeTruthy();
  });

  it('should create the title component', () => {
    const expectedTitle='SpaceX';
    const mockInfo: InfoSpaceX = {
      name: 'SpaceX',
      founder: 'Elon Musk',
      summary: 'SpaceX designs, manufactures and launches advanced rockets and spacecraft. The company was founded in 2002 to revolutionize space technology, with the ultimate goal of enabling people to live on other planets.'
    };
    component.info$ = of(mockInfo);
    fixture.detectChanges();
    const titleElement = fixture.nativeElement.querySelector('h1');
    expect(titleElement.textContent).toContain(expectedTitle);
  })

  it('should create the founder text', () => {
    const expectedTitle='Elon Musk';
    const mockInfo: InfoSpaceX = {
      name: 'SpaceX',
      founder: 'Elon Musk',
      summary: 'SpaceX designs, manufactures and launches advanced rockets and spacecraft. The company was founded in 2002 to revolutionize space technology, with the ultimate goal of enabling people to live on other planets.'
    };
    component.info$ = of(mockInfo);
    fixture.detectChanges();
    const titleElement = fixture.nativeElement.querySelector('h3');
    expect(titleElement.textContent).toContain(expectedTitle);
  })

  it('should create the summary text', () => {
    const expectedTitle='SpaceX designs, manufactures and launches advanced rockets and spacecraft. The company was founded in 2002 to revolutionize space technology, with the ultimate goal of enabling people to live on other planets.'
    const mockInfo: InfoSpaceX = {
      name: 'SpaceX',
      founder: 'Elon Musk',
      summary: 'SpaceX designs, manufactures and launches advanced rockets and spacecraft. The company was founded in 2002 to revolutionize space technology, with the ultimate goal of enabling people to live on other planets.'
    };
    component.info$ = of(mockInfo);
    fixture.detectChanges();
    const titleElement = fixture.nativeElement.querySelector('p');
    expect(titleElement.textContent).toContain(expectedTitle);
  })
});
