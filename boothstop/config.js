/*
  BoothStop site settings. Edit this file, not app.js, for day-to-day changes.

  Booking requests go to boothstop@gmail.com through FormSubmit (formsubmit.co).
  The FIRST request sent from the live site triggers an activation email to that
  inbox. Requests are not delivered until you click the link in that email.
  If you ever set formEndpoint to '' and demoMode to true, the form shows the
  thank-you message but sends nothing.
*/
window.BOOTHSTOP_CONFIG = {
  // Where booking requests go. Any service that accepts a JSON POST works
  // (Formspree, Basin, Netlify Functions, a Google Apps Script, your own API).
  formEndpoint: 'https://formsubmit.co/ajax/boothstop@gmail.com',
  demoMode: false,

  // Contact details. Leave blank to hide them.
  phone: '',
  email: '',
  instagram: '',

  // Air cooler units in inventory. Controls the "Number of air coolers" choices.
  airCoolerUnits: 2,

  // Package prices. Leave null to show "Custom quote".
  // Example later: { '360-experience': 'Starting at $X' }
  packagePrices: {
    '360-experience': null,
    'digital-experience': null,
    'wedding-experience': null,
    'build-your-own': null
  },

  // Gallery. Put photos in /images/gallery/ and list them here.
  // category must be one of: 360, photo-booth, weddings, birthdays, corporate, special
  // A photo can belong to more than one category: category: ['360', 'weddings']
  gallery: [
    // { src: 'images/gallery/wedding-360-01.jpg', alt: 'Couple on the 360 booth at their reception', category: ['360', 'weddings'] }
  ]
};
