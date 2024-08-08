// @input SceneObject reference
// @input Asset.ObjectPrefab objectToSpawn
// @input float spawnRadius
// @input int numberOfObjects

function spawnObject() {
    var randomX = Math.random() * script.spawnRadius - script.spawnRadius / 2;
    var randomY = Math.random() * script.spawnRadius - script.spawnRadius / 2;
    var randomZ = Math.random() * script.spawnRadius - script.spawnRadius / 2;
    
    var randomPosition = new vec3(randomX, randomY, randomZ);
    var spawnPosition = script.reference.getTransform().getWorldPosition().add(randomPosition);
    var spawnedObject = script.objectToSpawn.instantiate(script.getSceneObject());
    spawnedObject.getTransform().setWorldPosition(spawnPosition);
}

function initialize() {
    for (var i = 0; i <= script.numberOfObjects; i++) {
        spawnObject();
    }
}

initialize()