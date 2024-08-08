// @input Component.Text hintText

function onUpdate() {
    if (!global.handTracking.getHand()) {
        script.hintText.enabled = true;
    } else {
        script.hintText.enabled = false;
    }
}

script.createEvent("UpdateEvent").bind(onUpdate);