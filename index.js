var scene, renderer, camera, controls, Planche1, Planche2;
var listeBoule1 = new Array();
var listeBoule2 = new Array();
var width = window.innerWidth;
var height = window.innerHeight;
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( width, height );
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    document.body.appendChild( renderer.domElement );
    
    var geoPlanche = new THREE.BoxGeometry( 24, 20, 1 );
    let tex = new THREE.TextureLoader();
    const materielPl = new THREE.MeshBasicMaterial({map: tex.load('bois.jpg')});//mila ao anaty serveur vao mandehany sary
    Planche1 = new THREE.Mesh( geoPlanche, materielPl );
    scene.add(Planche1);
    Planche1.position.z = 5;
    Planche1.position.x = -14;

    Planche2 = new THREE.Mesh( geoPlanche, materielPl );
    scene.add(Planche2);
    Planche2.position.z = 5;
    Planche2.position.x = 14;

    var geoBoule = new THREE.SphereGeometry(1);
    var materiel1 = new THREE.MeshStandardMaterial( {
        color: 0xeeeeee, //couleur
    });
    var materiel2 = new THREE.MeshStandardMaterial( {
        color: 0xffc266, //couleur
    });
    //Boules
    for (let i = 0; i < 8; i++) {
        listeBoule1[i] = new THREE.Mesh(geoBoule, materiel1);
    }
    for (let i = 0; i < 8; i++) {
        scene.add(listeBoule1[i]);
        listeBoule1[i].position.z = 5.5;
    }
    listeBoule1[0].position.x = 3.5;
    listeBoule1[0].position.y = 9;
    //
    listeBoule1[1].position.x = 9;
    listeBoule1[1].position.y = 6;
    //
    listeBoule1[2].position.x = 14.5;
    listeBoule1[2].position.y = 3;
    //
    listeBoule1[3].position.x = 22;
    listeBoule1[3].position.y = 7.5;
    //
    listeBoule1[4].position.x = 7.5;
    listeBoule1[4].position.y = -3;
    //
    listeBoule1[5].position.x = 13;
    listeBoule1[5].position.y = -6;
    //
    listeBoule1[6].position.x = 18.5;
    listeBoule1[6].position.y = -9;
    //
    listeBoule1[7].position.x = 22;
    listeBoule1[7].position.y = -7.5;
    //
    
    for (let i = 0; i < 8; i++) {
        listeBoule2[i] = new THREE.Mesh(geoBoule, materiel2);
    }
    for (let i = 0; i < 8; i++) {
        scene.add(listeBoule2[i]);
        listeBoule2[i].position.z = 5.5;
    }
    listeBoule2[0].position.x = -3.5;
    listeBoule2[0].position.y = 9;
    //
    listeBoule2[1].position.x = -9;
    listeBoule2[1].position.y = 6;
    //
    listeBoule2[2].position.x = -14.5;
    listeBoule2[2].position.y = 3;
    //
    listeBoule2[3].position.x = -22;
    listeBoule2[3].position.y = 7.5;
    //
    listeBoule2[4].position.x = -7.5;
    listeBoule2[4].position.y = -3;
    //
    listeBoule2[5].position.x = -13;
    listeBoule2[5].position.y = -6;
    //
    listeBoule2[6].position.x = -18.5;
    listeBoule2[6].position.y = -9;
    //
    listeBoule2[7].position.x = -22;
    listeBoule2[7].position.y = -7.5;
    //

    var selectionables1 = new THREE.Group();
    scene.add(selectionables1);
    for (let i = 0; i < 8; i++) {
        selectionables1.add(listeBoule1[i]);
    }
    
    var selectionables2 = new THREE.Group();
    scene.add(selectionables2);
    for (let i = 0; i < 8; i++) {
        selectionables2.add(listeBoule2[i]);
    }

    var raycaster = new THREE.Raycaster();

    function Selectionner1(position) {
        raycaster.setFromCamera(position, camera);
        var selections = raycaster.intersectObjects(selectionables1.children);//liste-ny intersection
        if (selections.length) {
            return selections[0].object;
        }
    }
    function Selectionner2(position) {
        raycaster.setFromCamera(position, camera);
        var selections2 = raycaster.intersectObjects(selectionables2.children);//liste-ny intersection
        if (selections2.length) {
            return selections2[0].object;
        }
    }
    var nbreClick = 0;
    function MiClickSouris1(event1) {
        var position = new THREE.Vector2();
        //Position
        var domRect = renderer.domElement.getBoundingClientRect();
        position.x = ((event1.clientX - domRect.left) / domRect.width) * 2 - 1;
        position.y = - ((event1.clientY - domRect.top) / domRect.height) * 2 + 1;

        var ElClick1 = Selectionner1(position);
        var ElClick2 = Selectionner2(position);
        r = nbreClick % 2;
        if (ElClick1) {
            if (r == 0) {
                //Ato no atao ny deplacement fa mila le BackJs zah vao afaka manambatra
                ElClick1.position.x += 5;//exemple fotsiny ito
                nbreClick++;
                console.log("Vous avez sélectionné boules grises");
            }
            else {
                console.log("Ce n'est pas votre tour");
            }
        } 
        else {
            if (ElClick2) {
                if (r != 0) {
                    ElClick2.position.x += 5;
                    nbreClick++;
                    console.log("Vous avez sélectionné boules dorées");
                }
                else {
                    console.log("Ce n'est pas votre tour");
                }
            } 
            else {
                console.log("Vous n'avez rien sélectionné");
            }
        }
    }
    
    //Lumière
    var ambientLight = new THREE.AmbientLight(0xffffff, .1);
    scene.add(ambientLight);
    var directionalLight = new THREE.DirectionalLight(0xffdddd, .8);
    directionalLight.position.set(1,1,1);
    scene.add(directionalLight);
    var pointLight = new THREE.DirectionalLight(0xaaaaff, .3);
    pointLight.position.set(-2,1,1);
    scene.add(pointLight);
    camera.position.z = 20;
    //controle camera;
    /*controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.rotateSpeed = .07;
    controls.enableDamping = true;
    controls.dampingFactor = .05;*/



function render() {
    requestAnimationFrame( render );
    //controls.update();
    renderer.domElement.addEventListener('click', MiClickSouris1, false);
    //renderer.domElement.addEventListener('click', MiClickSouris2, false);
    renderer.render( scene, camera );
}
render();