// Represents the display state
let displayState = true;

// Contains the landing element
let landingElement = null;

/** attachAnimationHandler
 *  Hides the given element on animationend and shows the element before animationstart based on displayState
 * @param {htmlElement} element 
 */
export default function attachAnimationHandler(element){
    landingElement = element;
    
    landingElement.addEventListener('animationstart', () => {
        if(!displayState){
            landingElement.classList.remove('landingHidden');
        }
    });

    landingElement.addEventListener('animationend', () => {
        if(displayState) {
            landingElement.classList.add('landingHidden');
        }

        displayState = !displayState;
    });
}

/** triggerHideAnimation
 *  Pretty self explanatory
 */
export function triggerHideAnimation(){
    landingElement.style.animation = 'hideLanding 0.35s ease-in-out';
}

/** triggerShowAnimation
 *  Pretty self explanatory
 */
export function triggerShowAnimation(){
    landingElement.style.animation = 'showLanding 0.35s ease-in-out';
}
