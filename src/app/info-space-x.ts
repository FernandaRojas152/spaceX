export interface InfoSpaceX {
    name: string,
    founder: string,
    founded: number,
    employees: number,
    vehicles: number,
    launch_sites: number,
    test_sites: number,
    ceo: string,
    cto: string,
    coo: string,
    cto_propulsion: string,
    valuation: bigint,
    headquarters: InfoSpaceXHeadQuarter,
    summary: string,
}

export interface InfoSpaceXHeadQuarter {
    address: string,
    city: string,
    state: string,
}
