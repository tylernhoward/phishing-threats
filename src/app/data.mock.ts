import { IMarker } from './interfaces/IMarker';

export const phishMock1: any = {
    phish_id: '5302705',
    url: 'http:\/\/phishingsite\/MyResearch\/Home\/',
    phish_detail_url: 'http:\/\/www.phishtank.com\/phish_detail.php?phish_id=5302205',
    submission_time: '2016-11-27T18:26:24+00:00',
    verified: 'yes',
    verification_time: '2017-10-27T19:10:11+00:00',
    online: 'yes',
    details: [{
        ip_address: '186.31.33.116',
        cidr_block: '186.31.0.0\/16',
        announcing_network: '16276',
        rir: 'ripencc',
        country: 'FR',
        detail_time: '2016-11-27T18:27:05+00:00'
    }
    ],
    target: 'Other'
};
export const phishMock2: any = {
    phish_id: '5302705',
    url: 'http:\/\/asa.lib.lehigh.ulibl.ga\/MyResearch\/Home\/',
    phish_detail_url: 'http:\/\/www.phishtank.com\/phish_detail.php?phish_id=5302705',
    submission_time: '2017-10-27T18:26:24+00:00',
    verified: 'yes',
    verification_time: '2017-10-27T19:10:11+00:00',
    online: 'yes',
    details: [{
        ip_address: '176.31.33.116',
        cidr_block: '176.31.0.0\/16',
        announcing_network: '16276',
        rir: 'ripencc',
        country: 'US',
        detail_time: '2017-10-27T18:27:05+00:00'
    }
    ],
    target: 'AOL'
};
export const phishMocks: any[] = [
    phishMock1, phishMock1, phishMock2, phishMock2, phishMock1,
    phishMock1, phishMock1, phishMock2, phishMock1, phishMock2,
    phishMock1, phishMock2, phishMock1, phishMock2, phishMock1,
    phishMock2, phishMock2, phishMock1, phishMock2, phishMock1,
    phishMock1, phishMock2, phishMock2, phishMock2, phishMock1,
    phishMock2, phishMock2, phishMock2, phishMock2, phishMock1,
    phishMock1, phishMock2, phishMock1, phishMock2, phishMock1,
];
export const ipMock: Array<Object> = [
    { latitude: 0, longitude: 0},
    { latitude: 0, longitude: 0},
    { latitude: 0, longitude: 0}
];
export const countMock: Array<Object> = [
    { id: 'a', count: 1 }, { id: 'b', count: 2 }, { id: 'c', count: 3 },
    { id: 'h', count: 8 }, { id: 'g', count: 4 }, { id: 'f', count: 2 },
    { id: 't', count: 5 }, { id: 'y', count: 9 }, { id: 'z', count: 3 }
];
