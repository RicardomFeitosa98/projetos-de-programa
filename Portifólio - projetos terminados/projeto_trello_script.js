


        
        var matrixpy = [
        [false,false,false,false,false,false], 
        [false,false,false,false,false,false],
        [false,false,false,false,false,false],    
        ] 
        
          //matriz 3x6 que representa todas as posições que os postitts podem assumir no quadro de postits:
          //43,185 350,185 665,185 974,185 1285,185 1595,185
          // 43,371 350,371 665,371 974,371 1285,371 1595,371
          //43,571 350,571 665,571 974,571 1285,571 1595,571
          //esses seriam os x e y de todos os pontos exatamente
          // usaremos " false " e " true " para indicar a presença ou asencia de postit em determinada posição


        var  arrayx = [43,350,665,974,1285,1595] 
        var  arrayy  =[185,371,571]              
        //array x = todos os x possiveis para os postis 
        //array y = todos os y possiveis para os postits
        // o obejtivo desses arrays é conseguir usar a posição x ( offsetleft) e posição y (offsettop) dos elementos para
        //fazer referencia a posição correta na nossa matriz = matrixpy
        // por exemplo, na posição x=43 y = 371 o indice de 43 é 0 e o indice de 371 é 1 
        // ao fazer o matrixpy[1][0] temos exatamente a posição que queremos no nosso quadro de postits : 43,371



        var cria =function(cname,px)  {
          if (document.getElementsByClassName(cname).length<1) {
                criadiv(cname,185,px)
                return
              }
          if (document.getElementsByClassName(cname).length == 1) {
                criadiv(cname,371,px)
                return
              }
          if (document.getElementsByClassName(cname).length == 2) {
                criadiv(cname,571,px)
              }
	              
        }
        //essa função cria os postits, usando o indice da classe para criar definir a posição y
        // isso funciona pois temos um botão para cada coluna, então podemos criar uma classe para cada coluna também
        // essa função também faz que, uma vez que tenham sido criados 3 postits em uma coluna, ela impeça a criação do quarto postit
        // essa função será atrelada a cada botão
              
            
                    
                
        var  criadiv= function(cname,py,px){
            var text = document.createElement("div")
                text.className=cname
                text.style.left =px +'px'
                text.style.top =py +'px'
            var text1= document.createElement('textarea')
                text1.rows ='10'
                text1.cols ='30'
                text1.innerText='Escreva aqui'
                text.appendChild(text1)
            var text2=document.createElement('div')
                text2.className='mydivheader' 
                text.appendChild(text2)
                document.body.appendChild(text)
                matrixpy[arrayy.indexOf(parseInt(py))][arrayx.indexOf(parseInt(px))] = true
            for (var i = 0; i < document.getElementsByClassName(cname).length; i++) {
	            dragElement(document.getElementsByClassName(cname)[i])
	            }
             }
          // essa função cria efetivamente o postit, primeiros criamos um "Div mãe" e nele inserimos a nossa caixa de texto e o nosso "header" que servirá para arrastar o postit
          // nessa função colocamos o nome da classe (cname) e a posição x e y ( px,py) em que o postit será inicialmente criado
          // aqui também alteraremos a matriz que corresponde ao quadro do postit, fazendo que, na posição onde o postit for criado, a matriz seja mudada de" false" para " true"
          // por fim, aplicaremos a função "dragElement" que nos possibilitará mover os postits, a repetição é nescessária garantir que sempre a função será aplicada a todos os postits criados
          
             
                                     
        function dragElement(cname) {
          var pos1 = 0,
              pos2 = 0,
              pos3 = 0,
              pos4 = 0;
              cname.getElementsByClassName("mydivheader")[0].onmousedown = dragMouseDown;
          //aqui é o inicio da nossa função de movimento, nela invocamos o "header" do postit, ele será o nosso meio de mover o postit
              
             
              
             
             
          function dragMouseDown(e) {
              e = e || window.event;
              e.preventDefault();
              matrixpy[arrayy.indexOf(cname.offsetTop)][arrayx.indexOf(cname.offsetLeft)] = false
              pos3 = e.clientX;
              pos4 = e.clientY;
              document.onmouseup = closeDragElement;
              document.onmousemove = elementDrag;
              const i = cname.offsetTop
              const j = cname.offsetLeft
              //essa é a função ativada ao clicar no "header" iniciando o movimento, nela temos três pontos muito importantes:
              //1° obtemos a posição (x,y) do mouse do cliente, isso será importante para executar a função elementDrag
              //2° colocamos indicações para o que ser feito quando soltamos o botão do mouse ( closeDragElement) e quando movermos o mouse ( elementDrag)
              //3° gravamos nas constantes i e j as posições iniciais dos postits
              // i e j serão importantes para fazer o postit  voltar a posição inicial caso já exista outro postit ocupando o lugar

              function elementDrag(e) {
                e = e || window.event;
                e.preventDefault();
                pos1 = pos3 - e.clientX;
                pos2 = pos4 - e.clientY;
                pos3 = e.clientX;
                pos4 = e.clientY;
                cname.style.top = cname.offsetTop - pos2 + "px"; //px = pixels
                cname.style.left = cname.offsetLeft - pos1 + "px";
              }
             // aqui temos a função que moverá o nosso postit;
             // a cada movimento do mouse com o botão clicado estaremos recalculando a posição do postit, baseado na posição anterior dele e a posição atual do mouse;
             // na prática, essa função faz com que o postit siga o mouse;
             //se quiser ver esses calculos sendo feitos na hora, basta adicionar um console.log(cname.offsetTop)  e/ou console.log(cname.offsetLeft) dentro da função;
              
    
            
    
            function closeDragElement() {

              //aqui teremos a parte mais complicada do código, onde terminaremos o movimento do postit, ao soltar o botão do mouse, fixaremos ele na posição desejada, 
              // alteraremos a matriz de "false" para true",e voltaremos ele para posição inicial caso a matriz já esteja "true" para a posição desejada;
              var iffy = function(){
                if(cname.offsetTop<270){
                    cname.style.top = 185 + 'px'
                        if(matrixpy[arrayy.indexOf(cname.offsetTop)][arrayx.indexOf(cname.offsetLeft)] == true){
                          cname.style.left= j + "px"
                          cname.style.top = i +'px'
                        }
                        if(matrixpy[arrayy.indexOf(cname.offsetTop)][arrayx.indexOf(cname.offsetLeft)] == false){
                          matrixpy[arrayy.indexOf(cname.offsetTop)][arrayx.indexOf(cname.offsetLeft)] = true
                        }
                    }
                  if(cname.offsetTop>=270 && cname.offsetTop<450){
                    cname.style.top = 371 + 'px'
                      if(matrixpy[arrayy.indexOf(cname.offsetTop)][arrayx.indexOf(cname.offsetLeft)] == true){
                        cname.style.left= j + "px"
                        cname.style.top = i +'px'
                      }
                      if(matrixpy[arrayy.indexOf(cname.offsetTop)][arrayx.indexOf(cname.offsetLeft)] == false){
                        matrixpy[arrayy.indexOf(cname.offsetTop)][arrayx.indexOf(cname.offsetLeft)] = true
                      }
                    }
                    if(cname.offsetTop>=450){
                    cname.style.top = 571 + 'px'
                      if(matrixpy[arrayy.indexOf(cname.offsetTop)][arrayx.indexOf(cname.offsetLeft)] == true){
                        cname.style.left= j + "px"
                        cname.style.top = i +'px'
                      }
                      if(matrixpy[arrayy.indexOf(cname.offsetTop)][arrayx.indexOf(cname.offsetLeft)] == false){
                        matrixpy[arrayy.indexOf(cname.offsetTop)][arrayx.indexOf(cname.offsetLeft)] = true
                      }
                  
                    }
              }

              // a função iffy será executada após verificarmos a posição x ( explicaremos abaixo) e nos ajudará em duas tarefas importantes:
              // 1° verificaremos a posição y do postit, dividindo a tela em 3 grandes areas referentes as 3 linhas que queremos,
              // ao soltar o postit dentro de uma das areas, ele será alocado na posição y (style.Top) desejada
              // 2° uma vez verificada a posição x e y, verificamos a nossa matriz, 
              // caso a posição em que soltamos o postit esteja vaga ('false') manteremos a posição do postit e mudaremos o elemento da matriz para "true"
              // caso a posição em que soltamos o postit esteja ocupada ('true') retornaremos o postit para a posição inicial, anteriormente definida nas variaveis i e j
             
            
              if(cname.offsetLeft < 150){
                  cname.style.left= 43+'px'
                  document.onmouseup = null;
                  document.onmousemove = null
                  iffy()
                
              }
              if(cname.offsetLeft >= 150 && cname.offsetLeft <480){
                  cname.style.left= 350+'px'
                  document.onmouseup = null;
                  document.onmousemove = null;
                  iffy()
                 
              }
              if (cname.offsetLeft>=500 && cname.offsetLeft < 800){
                cname.style.left= 665+'px'
                document.onmouseup = null;
                document.onmousemove = null;
                  iffy()
                  
              }
              if (cname.offsetLeft>=800 && cname.offsetLeft < 1095){
                cname.style.left= 974+'px'
                document.onmouseup = null; 
                document.onmousemove = null;
                iffy()
                
              }
              if(cname.offsetLeft>=1095 && cname.offsetLeft < 1400){
                  cname.style.left= 1285+'px'
                  document.onmouseup = null;
                  document.onmousemove = null;
                  iffy()
                
              }
              if(cname.offsetLeft>=1400 && cname.offsetLeft < 1750){
                cname.style.left= 1595+'px'
                document.onmouseup = null
                document.onmousemove = null
                  iffy()
                
              }
              // aqui temos três tarefas importantes sendo executadas
              // 1° verificaremos a posição x do postit, dividindo a tela em 6 grandes areas referentes as 6 colunas que queremos,
              // ao soltar o postit dentro de uma das areas, ele será alocado na posição x (style.Left) desejada
              // 2° executaremos a função iffy como explicado acima
              // 3° encerramos a função usando o document.mouseup = null e document.onmousemove = null
             
                
             
            }
          }
            
          }
          
           
          
          
