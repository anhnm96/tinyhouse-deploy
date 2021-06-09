"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Google = void 0;
const googleapis_1 = require("googleapis");
const google_maps_services_js_1 = require("@googlemaps/google-maps-services-js");
// https://github.com/googleapis/google-api-nodejs-client#oauth2-client
const auth = new googleapis_1.google.auth.OAuth2(process.env.G_CLIENT_ID, process.env.G_CLIENT_SECRET, `${process.env.PUBLIC_URL}/login`);
const maps = new google_maps_services_js_1.Client();
const parseAddress = (addressComponents) => {
    let country = null;
    let admin = null;
    let city = null;
    for (const component of addressComponents) {
        if (component.types.includes(google_maps_services_js_1.AddressType.country)) {
            country = component.long_name;
        }
        if (component.types.includes(google_maps_services_js_1.AddressType.administrative_area_level_1)) {
            admin = component.long_name;
        }
        if (component.types.includes(google_maps_services_js_1.AddressType.locality) ||
            component.types.includes(google_maps_services_js_1.AddressType.postal_code)) {
            city = component.long_name;
        }
    }
    return {
        country,
        admin,
        city
    };
};
exports.Google = {
    authUrl: auth.generateAuthUrl({
        access_type: 'online',
        scope: [
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/userinfo.profile'
        ]
    }),
    login: async (code) => {
        const { tokens } = await auth.getToken(code);
        auth.setCredentials(tokens);
        // this requires to enable Google People Api in console
        const { data } = await googleapis_1.google.people({ version: 'v1', auth }).people.get({
            resourceName: 'people/me',
            personFields: 'emailAddresses,names,photos'
        });
        return { user: data };
    },
    geocode: async (address) => {
        const response = await maps.geocode({
            params: {
                key: process.env.G_GEOCODE_KEY,
                address
            }
        });
        if (response.status < 200 || response.status > 299) {
            throw new Error("failed to geocode address");
        }
        return parseAddress(response.data.results[0].address_components);
    }
};
