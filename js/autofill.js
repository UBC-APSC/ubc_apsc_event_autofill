(function ($, Drupal) {
    Drupal.behaviors.ubc_apsc_event_autofill = {
      attach: function (context, settings) {
        const locationFields = [
            '[data-drupal-selector="edit-field-event-location-0-address-address-line1"]',
            '[data-drupal-selector="edit-field-event-location-0-address-address-line2"]',
            '[data-drupal-selector="edit-field-event-location-0-address-administrative-area"]',
            '[data-drupal-selector="edit-field-event-location-0-address-locality"]',
            '[data-drupal-selector="edit-field-event-location-0-address-postal-code"]',
          ];
  
        $(locationFields.join(', '), context).each(function () {
            const $element = $(this);
            $element.on('change', function () {
              generateMapText();
            });
          });
  
        function generateMapText() {
            const addressLine1 = $('[data-drupal-selector="edit-field-event-location-0-address-address-line1"]').val();
            const addressLine2 = $('[data-drupal-selector="edit-field-event-location-0-address-address-line2"]').val();
            const administrativeArea = $('[data-drupal-selector="edit-field-event-location-0-address-administrative-area"]').val();
            const locality = $('[data-drupal-selector="edit-field-event-location-0-address-locality"]').val();
            const countryText = $('[data-drupal-selector="edit-field-event-location-0-address-country-code"] option:selected').text();
            const postalCode = $('[data-drupal-selector="edit-field-event-location-0-address-postal-code"]').val();
            
            const addressComponents = [addressLine1, addressLine2, locality, administrativeArea, postalCode, countryText];

            const filteredComponents = addressComponents.filter(component => component !== null && component !== undefined && component !== '');


            const mapText = filteredComponents.join(', ')
            $('#edit-field-event-map-0-value').val(mapText);
        }

        // Listen for changes on the Event format dropdown
        $('[data-drupal-selector="edit-field-event-format"]').on('change', function () {
          const selectedText = $(this).find('option:selected').text(); // Get the text of the selected option

          if (selectedText === 'Online Event') {
              $('#edit-field-disable-google-maps-link-value').prop('checked', true);
          }else{
              $('#edit-field-disable-google-maps-link-value').prop('checked', false);
          }
        });
      }
    };
  })(jQuery, Drupal);
  