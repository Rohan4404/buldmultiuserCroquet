import { PawnBehavior } from "../PrototypeBehavior";

import * as THREE from "three";
import * as dat from "dat.gui";
import Highcharts from "highcharts";

class LightPawn extends PawnBehavior {
  setup() {
    let trm = this.service("ThreeRenderManager");
    let group = this.shape;
    let THREE = Microverse.THREE;
    let model;

    if (this.actor._cardData.toneMappingExposure !== undefined) {
      trm.renderer.toneMappingExposure =
        this.actor._cardData.toneMappingExposure;
    }

    // Initialize DRACOLoader
    const dracoLoader = new THREE.DRACOLoader();
    dracoLoader.setDecoderPath(
      "https://cdn.jsdelivr.net/npm/three@0.152.0/examples/jsm/libs/draco/"
    );

    // Set DRACOLoader as an extension to GLTFLoader
    const gltfLoader = new THREE.GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);

    this.lights = [];

    const loadModelPromise = new Promise((resolve, reject) => {
      gltfLoader.load(
        "./assets/light-bulb.glb",
        (gltf) => {
          model = gltf.scene;

          model.position.set(1.5, 1.0, 0);
          const scaleFactor = 0.1;
          model.scale.set(scaleFactor, scaleFactor, scaleFactor);

          group.add(model);
          console.log(model);

          resolve(model);
        },
        null,
        (error) => {
          console.error("Error loading GLTF model:", error);
          reject(error);
        }
      );
    });

    loadModelPromise
      .then((model) => {})

      .catch((error) => {
        console.error("Error loading GLTF model:", error);
      });
  }

  teardown() {
    let scene = this.service("ThreeRenderManager").scene;

    scene.background?.dispose();
    scene.environment?.dispose();
    scene.background = null;
    scene.environment = null;
  }
}

export default {
  modules: [
    {
      name: "Fun3",
      pawnBehaviors: [LightPawn],
    },
  ],
};
