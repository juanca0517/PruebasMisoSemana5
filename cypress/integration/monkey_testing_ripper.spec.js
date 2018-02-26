describe('Los estudiantes under monkeys', function() {
    it('visits los estudiantes and survives monkeys', function() {
        cy.visit('https://losestudiantes.co');
        cy.contains('Cerrar').click();
        cy.wait(2000);
        randomTest(100);
    })
})

function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    };

function randomTest(monkeysLeft) {
    if(monkeysLeft > 0) {
      var testEjec = getRandomInt(1,4);
      switch(testEjec){
        case 1:
          cy.get('a').then($links => {
                var randomLink = $links.get(getRandomInt(0, $links.length));
                if(!Cypress.Dom.isHidden(randomLink)) {
                    cy.wrap(randomLink).click({force: true});
                    monkeysLeft = monkeysLeft - 1;
                }
                setTimeout(randomTest, 2000, monkeysLeft);
          });
          break;
        case 2:
            var randomString = function(length) {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for(var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return text;
         };
            if(monkeysLeft > 0) {
                cy.get('input').then($inputs => {
                    var randomInput = $inputs.get(getRandomInt(0, $inputs.length));
                    if(randomInput.type !== "checkbox") {
                        try {
                            if(!Cypress.Dom.isHidden(randomInput)) {
                                cy.wrap(randomInput).click({force: true}).type(randomString(getRandomInt(5, 20)));
                                monkeysLeft -1;
                            }
                        }
                        catch(e) {
                            console.log(e);
                        }
                 }
                    setTimeout(randomTest, 2000, monkeysLeft);
                });
            }
        case 3:
          cy.get('select').then($Selects => {
              var randomSelect = $Selects.get(getRandomInt(0, $Selects.length));
              if(!Cypress.Dom.isHidden(randomSelect)) {
                  var selects = randomSelect.options;
                  var randomOption = selects[getRandomInt(0,selects.length)];
                  var valueSelect = randomOption.value;
                  cy.wrap(randomSelect).select(valueSelect);
                  monkeysLeft = monkeysLeft - 1;
              }
              setTimeout(randomTest, 2000, monkeysLeft);
          });
          break;
        case 4:
          cy.get('button').then($Buttons => {
              var randomButton = $Buttons.get(getRandomInt(0, $Buttons.length));
              if(!Cypress.Dom.isHidden(randomButton)) {
                  cy.wrap(randomButton).click({force: true});
                  monkeysLeft = monkeysLeft - 1;
              }
              setTimeout(randomTest, 2000, monkeysLeft);
          });
          break;
        }
    }
}
