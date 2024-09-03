// import { PawnBehavior } from "../PrototypeBehavior";
// import * as THREE from "three";
// import * as dat from "dat.gui";
// import Highcharts from "highcharts";

// class LightPawn extends PawnBehavior {
//   setup() {
//     let trm = this.service("ThreeRenderManager");
//     let group = this.shape;
//     let THREE = Microverse.THREE;

//     if (this.actor._cardData.toneMappingExposure !== undefined) {
//       trm.renderer.toneMappingExposure =
//         this.actor._cardData.toneMappingExposure;
//     }

//     const dracoLoader = new THREE.DRACOLoader();
//     dracoLoader.setDecoderPath(
//       "https://cdn.jsdelivr.net/npm/three@0.152.0/examples/jsm/libs/draco/"
//     );
//     const gltfLoader = new THREE.GLTFLoader();
//     gltfLoader.setDRACOLoader(dracoLoader);

//     this.lights = [];

//     const loadFirstModelPromise = new Promise((resolve, reject) => {
//       gltfLoader.load(
//         "./assets/light-bulb.glb",
//         (gltf) => {
//           const model1 = gltf.scene;
//           model1.position.set(-5.3, 4.2, 5);
//           const scaleFactor = 0.03;
//           model1.scale.set(scaleFactor, scaleFactor, scaleFactor);
//           model1.rotation.set(1.5, 5, 0.3);
//           group.add(model1);

//           const fetchAPIDataAndChangeColor = () => {
//             fetch("https://full-duplex-dynalic-api.vercel.app/btn-state")
//               .then((response) => response.json())
//               .then((data) => {
//                 console.log("API response:", data.btnState);
//                 const colorHelper = data.btnState === 1 ? "red" : "white"; // Set to red if 1, otherwise white

//                 model1.traverse((child) => {
//                   if (child.isMesh) {
//                     child.material.color.set(colorHelper);
//                     child.material.needsUpdate = true;
//                   }
//                 });
//               })
//               .catch((error) => {
//                 console.error("Error fetching API data:", error);
//               });
//           };

//           fetchAPIDataAndChangeColor();
//           setInterval(fetchAPIDataAndChangeColor, 1000);

//           console.log("First model loaded:", model1);
//           resolve(model1);
//         },
//         null,
//         (error) => {
//           console.error("Error loading first GLTF model:", error);
//           reject(error);
//         }
//       );
//     });

//     const loadSecondModelPromise = new Promise((resolve, reject) => {
//       gltfLoader.load(
//         "./assets/light_switch.glb",
//         (gltf) => {
//           const model2 = gltf.scene;
//           model2.position.set(-4.2, 3.5, 5);
//           const scaleFactor = 5;
//           model2.scale.set(scaleFactor, scaleFactor, scaleFactor);
//           model2.rotation.set(-0.4, -1.4, -0.5);

//           group.add(model2);
//           console.log("Second model loaded:", model2);

//           // Add event listener for click to toggle API state and button color
//           model2.traverse((child) => {
//             if (child.isMesh) {
//               child.userData.clickable = true;
//             }
//           });

//           const raycaster = new THREE.Raycaster();
//           const mouse = new THREE.Vector2();

//           let isRed = false; // Track the current color state of the button

//           const onClick = (event) => {
//             mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//             mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
//             raycaster.setFromCamera(mouse, trm.camera);

//             const intersects = raycaster.intersectObjects(group.children, true);
//             if (intersects.length > 0) {
//               const clickedObject = intersects[0].object;
//               if (clickedObject.userData.clickable) {
//                 // Toggle API state
//                 fetch("https://full-duplex-dynalic-api.vercel.app/toggle-btn", {
//                   method: "POST",
//                 })
//                   .then((response) => response.json())
//                   .then((data) => {
//                     console.log("Toggled API state:", data);
//                     // Toggle button color
//                     isRed = !isRed;
//                     const colorHelper = isRed ? "red" : "white";
//                     model2.traverse((child) => {
//                       if (child.isMesh) {
//                         child.material.color.set(colorHelper);
//                         child.material.needsUpdate = true;
//                       }
//                     });
//                   })
//                   .catch((error) => {
//                     console.error("Error toggling API state:", error);
//                   });
//               }
//             }
//           };

//           window.addEventListener("click", onClick, false);

//           resolve(model2);
//         },
//         null,
//         (error) => {
//           console.error("Error loading second GLTF model:", error);
//           reject(error);
//         }
//       );
//     });

//     Promise.all([loadFirstModelPromise, loadSecondModelPromise])
//       .then(([model1, model2]) => {
//         console.log("Both models loaded successfully");
//       })
//       .catch((error) => {
//         console.error("Error loading models:", error);
//       });
//   }

//   teardown() {
//     let scene = this.service("ThreeRenderManager").scene;

//     scene.background?.dispose();
//     scene.environment?.dispose();
//     scene.background = null;
//     scene.environment = null;
//   }
// }

// export default {
//   modules: [
//     {
//       name: "Fun2",
//       pawnBehaviors: [LightPawn],
//     },
//   ],
// };

// import { PawnBehavior } from "../PrototypeBehavior";
// import * as THREE from "three";

// class LightPawn extends PawnBehavior {
//   setup() {
//     let trm = this.service("ThreeRenderManager");
//     let group = this.shape;
//     let THREE = Microverse.THREE;

//     const dracoLoader = new THREE.DRACOLoader();
//     dracoLoader.setDecoderPath(
//       "https://cdn.jsdelivr.net/npm/three@0.152.0/examples/jsm/libs/draco/"
//     );
//     const gltfLoader = new THREE.GLTFLoader();
//     gltfLoader.setDRACOLoader(dracoLoader);

//     const loadFirstModelPromise = new Promise((resolve, reject) => {
//       gltfLoader.load(
//         "./assets/light-bulb.glb",
//         (gltf) => {
//           const model1 = gltf.scene;
//           model1.position.set(-5.3, 4.2, 5);
//           const scaleFactor = 0.03;
//           model1.scale.set(scaleFactor, scaleFactor, scaleFactor);
//           model1.rotation.set(1.5, 5, 0.3);
//           group.add(model1);

//           const fetchAPIDataAndChangeColor = () => {
//             fetch("https://full-duplex-dynalic-api.vercel.app/btn-state")
//               .then((response) => response.json())
//               .then((data) => {
//                 const colorHelper = data.btnState === 1 ? "red" : "white";
//                 model1.traverse((child) => {
//                   if (child.isMesh) {
//                     child.material.color.set(colorHelper);
//                     child.material.needsUpdate = true;
//                   }
//                 });
//                 this.publish("colorChange", colorHelper);
//               })
//               .catch((error) => {
//                 console.error("Error fetching API data:", error);
//               });
//           };

//           fetchAPIDataAndChangeColor();
//           setInterval(fetchAPIDataAndChangeColor, 1000);

//           resolve(model1);
//         },
//         null,
//         (error) => {
//           console.error("Error loading first GLTF model:", error);
//           reject(error);
//         }
//       );
//     });

//     const loadSecondModelPromise = new Promise((resolve, reject) => {
//       gltfLoader.load(
//         "./assets/light_switch.glb",
//         (gltf) => {
//           const model2 = gltf.scene;
//           model2.position.set(-4.2, 3.5, 5);
//           const scaleFactor = 5;
//           model2.scale.set(scaleFactor, scaleFactor, scaleFactor);
//           model2.rotation.set(-0.4, -1.4, -0.5);

//           group.add(model2);

//           model2.traverse((child) => {
//             if (child.isMesh) {
//               child.userData.clickable = true;
//             }
//           });

//           const raycaster = new THREE.Raycaster();
//           const mouse = new THREE.Vector2();

//           let isRed = false;

//           const onClick = (event) => {
//             mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//             mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
//             raycaster.setFromCamera(mouse, trm.camera);

//             const intersects = raycaster.intersectObjects(group.children, true);
//             if (intersects.length > 0) {
//               const clickedObject = intersects[0].object;
//               if (clickedObject.userData.clickable) {
//                 fetch("https://full-duplex-dynalic-api.vercel.app/toggle-btn", {
//                   method: "POST",
//                 })
//                   .then((response) => response.json())
//                   .then((data) => {
//                     isRed = !isRed;
//                     const colorHelper = isRed ? "red" : "white";
//                     this.publish("colorChange", colorHelper);
//                     model2.traverse((child) => {
//                       if (child.isMesh) {
//                         child.material.color.set(colorHelper);
//                         child.material.needsUpdate = true;
//                       }
//                     });
//                   })
//                   .catch((error) => {
//                     console.error("Error toggling API state:", error);
//                   });
//               }
//             }
//           };

//           window.addEventListener("click", onClick, false);

//           // Debug: Log subscription to color changes
//           this.subscribe("colorChange", "changeColor", (color) => {
//             console.log("Received color change:", color);
//             model2.traverse((child) => {
//               if (child.isMesh) {
//                 child.material.color.set(color);
//                 child.material.needsUpdate = true;
//               }
//             });
//           });

//           resolve(model2);
//         },
//         null,
//         (error) => {
//           console.error("Error loading second GLTF model:", error);
//           reject(error);
//         }
//       );
//     });

//     Promise.all([loadFirstModelPromise, loadSecondModelPromise])
//       .then(([model1, model2]) => {
//         console.log("Both models loaded successfully");
//       })
//       .catch((error) => {
//         console.error("Error loading models:", error);
//       });
//   }

//   teardown() {
//     let scene = this.service("ThreeRenderManager").scene;

//     scene.background?.dispose();
//     scene.environment?.dispose();
//     scene.background = null;
//     scene.environment = null;
//   }
// }

// export default {
//   modules: [
//     {
//       name: "Fun2",
//       pawnBehaviors: [LightPawn],
//     },
//   ],
// };


import { PawnBehavior } from "../PrototypeBehavior";
import * as THREE from "three";

class LightPawn extends PawnBehavior {
  setup() {
    let trm = this.service("ThreeRenderManager");
    let group = this.shape;
    let THREE = Microverse.THREE;

    const dracoLoader = new THREE.DRACOLoader();
    dracoLoader.setDecoderPath(
      "https://cdn.jsdelivr.net/npm/three@0.152.0/examples/jsm/libs/draco/"
    );
    const gltfLoader = new THREE.GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);

    let model1, model2;
    let isRed = false;

    const loadFirstModelPromise = new Promise((resolve, reject) => {
      gltfLoader.load(
        "./assets/light-bulb.glb",
        (gltf) => {
          model1 = gltf.scene;
          model1.position.set(-5.3, 4.2, 5);
          const scaleFactor = 0.03;
          model1.scale.set(scaleFactor, scaleFactor, scaleFactor);
          model1.rotation.set(1.5, 5, 0.3);
          group.add(model1);

          // Set initial color
          model1.traverse((child) => {
            if (child.isMesh) {
              child.material.color.set("white");
            }
          });

          resolve(model1);
        },
        null,
        (error) => {
          console.error("Error loading first GLTF model:", error);
          reject(error);
        }
      );
    });

    const loadSecondModelPromise = new Promise((resolve, reject) => {
      gltfLoader.load(
        "./assets/light_switch.glb",
        (gltf) => {
          model2 = gltf.scene;
          model2.position.set(-4.2, 3.5, 5);
          const scaleFactor = 5;
          model2.scale.set(scaleFactor, scaleFactor, scaleFactor);
          model2.rotation.set(-0.4, -1.4, -0.5);

          group.add(model2);

          model2.traverse((child) => {
            if (child.isMesh) {
              child.userData.clickable = true;
            }
          });

          const raycaster = new THREE.Raycaster();
          const mouse = new THREE.Vector2();

          const onClick = (event) => {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
            raycaster.setFromCamera(mouse, trm.camera);

            const intersects = raycaster.intersectObjects(group.children, true);
            if (intersects.length > 0) {
              const clickedObject = intersects[0].object;
              if (clickedObject.userData.clickable) {
                // Toggle color
                isRed = !isRed;
                const colorHelper = isRed ? "red" : "white";

                // Publish color change
                this.publish("colorChange", colorHelper);

                // Update local models
                this.updateModelsColor(colorHelper);
              }
            }
          };

          window.addEventListener("click", onClick, false);

          // Subscribe to color changes from other users
          this.subscribe("colorChange", "changeColor", (color) => {
            this.updateModelsColor(color);
          });

          resolve(model2);
        },
        null,
        (error) => {
          console.error("Error loading second GLTF model:", error);
          reject(error);
        }
      );
    });

    Promise.all([loadFirstModelPromise, loadSecondModelPromise])
      .then(([m1, m2]) => {
        console.log("Both models loaded successfully");
        model1 = m1;
        model2 = m2;
      })
      .catch((error) => {
        console.error("Error loading models:", error);
      });
  }

  updateModelsColor(color) {
    // Update color of both models
    [this.model1, this.model2].forEach((model) => {
      model.traverse((child) => {
        if (child.isMesh) {
          child.material.color.set(color);
          child.material.needsUpdate = true;
        }
      });
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
      name: "Fun2",
      pawnBehaviors: [LightPawn],
    },
  ],
};
