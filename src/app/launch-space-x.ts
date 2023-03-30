export interface LaunchSpaceX {
  flight_number: number,
  mission_name: string,
  launch_year: string,
  rocket: Rocket,
  launch_site: LaunchSite,
  links: Links,
  details: string,
}

export interface Rocket {
  rocket_name: string,
}

export interface LaunchSite {
  site_name: string,
}

export interface Links {
  mission_patch: string,
  mission_patch_small: string,
  youtube_id: string,
}
