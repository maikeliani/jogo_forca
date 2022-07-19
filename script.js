refreshScreen();
const DICA = document.getElementById('dicain');
var letras_digitadas = document.querySelector('#digitado');
var pontos = 0;
var nome_categoria = ['Fruta', 'Países' ];
// var frutas = ['Maça', 'Banana', 'Abacaxi', 'Kiwi', 'Graviola', 'Cupuaçu','Amora', 'Lixia', 'Acerola', 'Caja', 'Caqui', 'Figo', 'Cidra', 'Inga', 'Umbu', 'sapoti', 'damasco', 'buriti', 'pessego', 'lichia', 'marmelo', 'Atemoia', 'Guarana', 'Gabiroba', 'Mirtilo', 'Pequi']
// var paises = ['Brasil', 'Alemanha', 'Holanda', 'Uganda', 'Paraguai', 'Russia', 'Quenia', 'Uruguai', 'Peru', 'França','Ucrania', 'China','Bosnia', 'Egito', 'Israel', 'Marrocos', 'Belgica', 'Noruega', 'Suecia', 'Suiça', 'Senegal','Marrocos', 'Tanzania', 'Gana', 'Etiopia', 'Nigeria', 'Mali', 'Argelia', 'Ruanda', 'Tunisia', 'Liberia', 'Guine', 'Togo', 'Malawi', 'Burundi', 'Gambia', 'Eritreia','Lesoto', 'Libia', 'Chade', 'Benin', 'Botsuana','Niger', 'Malasia', 'Catar', 'Maldivas', 'Laos', 'Nepal', 'Armenia', 'Jordania', 'Brunei', 'Kuwait', 'Bahrein', 'Macau', 'Myanmar', 'Cambodja', 'HongKong' ] ;
var splitword ;
var addword = [] ;
var letra = [] ;
var letterOFF = [] ;
var letra_pressionada = '' ;
var erro = 6;
var correto = 0;
var categoria = '';
var btn_reset = document.querySelector('#reset');
var buttonAdd = document.querySelector(".btn_add");
var sectionAdicionarPalavra = document.querySelector("#addPalavra");
var novaPalavra = document.querySelector("#nova-palavra");
var form = document.querySelector('#form');
var categoria_selecionada = document.querySelector('#escolha_categoria'); 
var botaoAddPalavra = document.querySelector("#enviar-palavra");



 // CHECAGEM PARA GARANTIR QUE SO SEJAM ADICIONADAS APENAS LETRAS SEM ACENTOS !!

 function checagemCaractere(e) {
  const char = String.fromCharCode(e.keyCode);
  console.log(e.keyCode);
  var padrao ='[a-z]'; // aceita espaço, letras minúsculas e números   
      if(char.match(padrao)) {
          return true;
      }
}
 // EVENTO QUE CHAMA A FUNÇÃO PARA GARANTIR AS REGRAS PARA ADD AS PALAVRAS!
novaPalavra.addEventListener('keypress', function(e) {
  if(!checagemCaractere(e)) {
    e.preventDefault();   
}
});

function adicionaPalavra(){    
    document.querySelector('.btn_play').style.display = 'none';
    document.querySelector('.btn_add').style.display = 'none';
    document.querySelector('.btn_new').style.display = 'none';
    document.querySelector('.btn_cancel').style.display = 'none';
    document.querySelector('.startpage').style.display = 'none';
    document.querySelector('.footer').style.display = 'none';
    document.querySelector('.copyrightGame').style.display = 'flex';
    document.querySelector('.games').style.display = 'none';
    document.querySelector('#dicain').style.display = 'none';
    document.querySelector('#digitado').style.display = 'none';
    document.querySelector('#addPalavra').style.display = "initial";
    splitword = '';
    word = '';
    
   
  
    botaoAddPalavra.addEventListener('click', function(event){
    event.preventDefault();    
    verificandoNovaPalavra();    
    });
  }


  function resetar(){   
    novaPalavra.value="" ;  
  }


 function verificandoNovaPalavra() {  
  erro = 1000;
 var palavra = novaPalavra.value;
 
 if (palavra.length <= 0) {
      alert("Insira uma palavra de até 8 letras!");
  } 
  else if (palavra.length > 8) {
      alert("A palavra digitada passou do limite máximo de 8 caracteres");
          } else {
            adicionarNaCategoria();
         }
       }  
   
  
   function adicionarNaCategoria(){
    var palavra = novaPalavra.value;
    alert(palavra);
    if (categoria_selecionada.value == 'Fruta') {
      frutas.push(palavra);   
      for (i=0;i<=frutas.length;i++){
        if(frutas[i]==palavra){
          alert("Fruta adicionada com sucesso!")
        }
      }         
    } else if(categoria_selecionada.value == 'Países'){
      paises.push(palavra);
      for (j=0;j<=paises.length;j++){
        if(paises[j]==palavra){
          alert("País adicionado com sucesso!")
        }
      }
      } else{
      alert('errooooooo');
    }

  }

  //Voltando ao menu
btnCancelar = document.querySelector("#cancelar");

btnCancelar.addEventListener('click', function cancelar(event) {
event.preventDefault();
 sectionAdicionarPalavra.style.display = "none"; 
 novaPalavra.value = "";
 refreshScreen();
  });
  
   
function confereTeclado(){
 document.addEventListener('keydown', function (e) {

  letra_pressionada = e.key.toUpperCase();
  console.log(e.keyCode);

  function confere_digitacao(){
    if ((e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode == 186)) { // se uma letra for pressionada
      startScanning(letra_pressionada);
   }
  }

  if (erro === 0) {
    document.querySelector('.msg-container').style.display = 'flex' ;
    document.querySelector('.msg-vitoria').style.display = 'none' ;
    document.querySelector('.msg-derrota').style.display = 'flex' ;
    var palavra_errada = document.querySelector('.palavra_errada');
    palavra_errada.innerHTML= 'A palavra era: ' + word;
    document.querySelector('.palavra_errada').style.display= 'flex' ;
    }
  confere_digitacao();
});
}


 /*  MÉTODO A SEGUIR ESCANEIA AS LETRAS */

function startScanning(letra_pressionada) {
  var text = document.querySelector('#digitado');
  var contentText = letras_digitadas.value;
  if(contentText.includes(letra_pressionada)) {
    alert('Você já escolheu essa letra!');
  } else {
    text.value += letra_pressionada;
    correctAndError(letra_pressionada);
  }
}


function correctAndError(letra_pressionada) {
  if (word.includes(letra_pressionada)) {
    scanLetter(letra_pressionada);
    console.log('Acertou: ',correto);
  } else if (!word.includes(letra_pressionada)){
    createForca(erro);
    console.log('Errou: ',erro);
  }
}


function scanLetter(letra_pressionada) {
  for (var i = 0; i <= splitword.length - 1; i++) {
    if (splitword[i].includes(letra_pressionada)) {
      correto += 1;
      pontos = Math.floor((correto/splitword.length)*100);
      atualizarDica(categoria);
      letterOFF[i].setAttribute('class', 'word-content')
      letterOFF[i].setAttribute('id', 'letra')
    } 
  }
  if (correto == splitword.length) {
    // aparece ( ou nAO) AS MENSAGENS: Parabéns, Você ganhou!     Que pena, Você perdeu!    Deseja jogar novamente?
    document.querySelector('.msg-container').style.display = 'flex'
    document.querySelector('.msg-vitoria').style.display = 'flex'
    document.querySelector('.msg-derrota').style.display = 'none';  
   }
}


function clearForca() {
  document.querySelector('.base').style.display = 'flex';
  document.querySelector('.astemaior').style.display = 'flex';  
  document.querySelector('.astemenor').style.display = 'flex';
  document.querySelector('.corda').style.display = 'flex';
  document.querySelector('.cabeca').style.display = 'none';
  document.querySelector('.bracodireito').style.display = 'none';
  document.querySelector('.bracoesquerdo').style.display = 'none';
  document.querySelector('.tronco').style.display = 'none';
  document.querySelector('.pernadireita').style.display = 'none';
  document.querySelector('.pernaesquerda').style.display = 'none';
}


function createForca(errorAUX) {
  erro--;
  errorAUX = errorAUX - 1;
  var bracodireito = document.querySelector('.bracodireito');
  var bracoesquerdo = document.querySelector('.bracoesquerdo');
  var cabeca = document.querySelector('.cabeca');
  var pernadireita = document.querySelector('.pernadireita');
  var pernaesquerda = document.querySelector('.pernaesquerda');
  var tronco = document.querySelector('.tronco');

  var forca = [pernadireita,pernaesquerda,bracodireito,bracoesquerdo,tronco,cabeca];
  forca[errorAUX].style.display='flex';
}

function refreshScreen() {
  document.querySelector('.btn_play').style.display = 'initial' ;
  document.querySelector('.btn_add').style.display = 'initial' ;
  document.querySelector('.btn_new').style.display = 'none' ;
  document.querySelector('.btn_cancel').style.display = 'none' ;
  document.querySelector('.footer').style.display = 'flex';
  document.querySelector('.startpage').style.display = 'flex';
  document.querySelector('.games').style.display = 'none';
  document.querySelector('.copyrightGame').style.display = 'none';
  document.querySelector('.msg-container').style.display = 'none'; 
  document.querySelector('#digitado').value = '' ;
  
}

function screenGame() {
  document.querySelector('.btn_play').style.display = 'none'
  document.querySelector('.btn_add').style.display = 'none'
  document.querySelector('.btn_new').style.display = 'initial'
  document.querySelector('.btn_cancel').style.display = 'initial'
  document.querySelector('.startpage').style.display = 'none'
  document.querySelector('.footer').style.display = 'none'
  document.querySelector('.copyrightGame').style.display = 'flex'
  document.querySelector('.games').style.display = 'flex'
  document.querySelector('#dicain').style.display = 'flex'
  document.querySelector('#digitado').style.display = 'flex'
  splitword = '';
  word = '';
  clearForca();
  play();
  confereTeclado();
}


function play() {
  splitword = '' ;
  categoria = nome_categoria[Math.ceil(Math.random() * nome_categoria.length - 1)];
  if (categoria == 'Países') {
    word = paises[Math.ceil(Math.random() * paises.length - 1)];
    word = word.toUpperCase();
    atualizarDica(categoria);
    splitword = [...word];
    hiddingWords(splitword);
  } else if (categoria == 'Fruta') {
    word = frutas[Math.ceil(Math.random() * frutas.length - 1)];
    word = word.toUpperCase();
    atualizarDica(categoria);
    
    splitword = [...word];
    hiddingWords(splitword);
  }
  console.log(categoria);
  console.log(word);
  console.log(erro);
}
function atualizarDica(categoria) {
  DICA.value = 'DICA:' +categoria ;
  // DICA.value = 'DICA:' +'\n'  +categoria ;
  DICA.style.color = 'red' ;
  
}
function hiddingWords(splitword) {
  console.log(splitword);
  for (var i = 0; i <= splitword.length - 1; i++) {
    addword[i] = document.getElementById('word');
    letterOFF[i] = document.createElement('p');
    letterOFF[i].setAttribute('class', 'word-contentOFF');
    letterOFF[i].innerHTML = splitword[i];
    letterOFF[i].setAttribute('id', 'letterOFF');
    addword[i].append(letterOFF[i]);
  }
}











