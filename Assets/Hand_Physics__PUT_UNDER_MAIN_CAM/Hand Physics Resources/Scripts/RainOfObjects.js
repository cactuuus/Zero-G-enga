// RainOfObjects.js
// Version: 0.3.0
// Event: On Awake
// Description: Instantiates scene objects for hand collision.

// @input SceneObject spawner
// @input SceneObject objectToSpawn
// @input float interval
// @input float spawnRadius
// @input float spawnHeight

if (script.objectToSpawn === undefined) {
    print("ERROR: Missing reference to objectToSpawn");
    script.getSceneObject().destroy();
    return;
}

script.objectToSpawn.enabled = false;

script.timer = 0;
script.objects = [];
script.killHeight = 0;

script.spawnObject = function(basePosition) {
    var randomX = Math.random() * script.spawnRadius - script.spawnRadius/2;
    var randomZ = -Math.random() * script.spawnRadius/2;
    var position = basePosition.add(new vec3(randomX, script.spawnHeight, randomZ));
    
    var rotation = quat.fromEulerAngles(Math.random() * 180, Math.random() * 180, Math.random() * 180);
    var obj = script.getSceneObject().getParent().copyWholeHierarchy(script.objectToSpawn);
    obj.getTransform().setWorldPosition(position);
    obj.getTransform().setWorldRotation(rotation);
    obj.enabled = true;
    script.objects.push(obj);
};

script.createEvent("UpdateEvent").bind(function() {
    var spawnPosition = script.spawner.getTransform().getWorldPosition();
    script.timer += getDeltaTime();
    if (script.timer > script.interval) {
        script.timer = 0;
        script.spawnObject(spawnPosition);
    }
    script.killHeight = spawnPosition.add(vec3.back().uniformScale(100));

    for (var i = script.objects.length - 1; i >= 0; i--) {
        if (script.objects[i].getTransform().getWorldPosition().z < script.killHeight) {
            var obj = script.objects[i];
            obj.destroy();
            script.objects.splice(i, 1);
        }
    }
});
