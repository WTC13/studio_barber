$(function(){

  /* ── NAVBAR SCROLL ── */
  $(window).on('scroll', function(){
    if($(this).scrollTop()>60) $('#navbar').addClass('scrolled');
    else $('#navbar').removeClass('scrolled');
  });

  /* ── SCROLL REVEAL ── */
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting) e.target.classList.add('visible');
    });
  },{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

  /* ── COUNTER ANIMATION ── */
  function animateCounter($el, target, duration, decimals=0){
    let start=0, step=target/((duration/16));
    let timer=setInterval(()=>{
      start+=step;
      if(start>=target){ start=target; clearInterval(timer); }
      $el.text(decimals>0?start.toFixed(decimals):Math.floor(start));
    },16);
  }
  let counted=false;
  $(window).on('scroll',function(){
    if(counted) return;
    let heroBottom=$('#hero').offset().top+$('#hero').height();
    if($(this).scrollTop()+$(window).height()>heroBottom-100){
      counted=true;
      animateCounter($('#count1').find('span').length?$('#count1'):$('#count1'),2400,1800);
      // Custom for decimals
      let $c2=$('#count2'); let v2=0; let s2=4.9/(1800/16);
      let t2=setInterval(()=>{v2+=s2;if(v2>=4.9){v2=4.9;clearInterval(t2);} $c2.html(v2.toFixed(1)+'<span>★</span>');},16);
      animateCounter($('#count3').find('span').length?$('#count3'):$('#count3'),7,1800);
    }
  });
  // Start counters for values
  function startCounters(){
    let $c1=$('#count1'); let v1=0; let s1=2400/(1800/16);
    let t1=setInterval(()=>{v1+=s1;if(v1>=2400){v1=2400;clearInterval(t1);} $c1.html(Math.floor(v1)+'<span>+</span>');},16);
    let $c2=$('#count2'); let v2=0; let s2=4.9/(1800/16);
    let t2=setInterval(()=>{v2+=s2;if(v2>=4.9){v2=4.9;clearInterval(t2);} $c2.html(v2.toFixed(1)+'<span>★</span>');},16);
    let $c3=$('#count3'); let v3=0; let s3=7/(1800/16);
    let t3=setInterval(()=>{v3+=s3;if(v3>=7){v3=7;clearInterval(t3);} $c3.html(Math.floor(v3)+'<span>+</span>');},16);
    counted=true;
  }
  setTimeout(startCounters,1500);

  /* ── GALLERY CAROUSEL ── */
  $('#galleryOwl').owlCarousel({
    loop:true, margin:8, nav:true, dots:true, autoplay:true, autoplayTimeout:3500,
    autoplayHoverPause:true,
    responsive:{0:{items:1},600:{items:2},900:{items:3},1200:{items:4}},
    navText:['&#8592;','&#8594;']
  });

  /* ── TESTIMONIALS CAROUSEL ── */
  $('#testimonialsOwl').owlCarousel({
    loop:true, margin:16, nav:false, dots:true, autoplay:true, autoplayTimeout:4500,
    autoplayHoverPause:true,
    responsive:{0:{items:1},768:{items:2},1200:{items:3}}
  });

  /* ── CHARTS ── */
  Chart.defaults.color='rgba(245,245,245,.5)';
  Chart.defaults.borderColor='rgba(255,255,255,.07)';

  // 1. Clientes por mês
  new Chart(document.getElementById('clientesChart'),{
    type:'bar',
    data:{
      labels:['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
      datasets:[{
        label:'Clientes',
        data:[142,158,171,185,200,219,198,225,240,252,238,270],
        backgroundColor:'rgba(200,16,46,.7)',
        borderColor:'rgba(200,16,46,1)',
        borderWidth:1, borderRadius:0
      }]
    },
    options:{
      responsive:true, plugins:{legend:{display:false}},
      scales:{x:{grid:{color:'rgba(255,255,255,.05)'}},y:{grid:{color:'rgba(255,255,255,.05)'}}}
    }
  });

  // 2. Distribuição serviços
  new Chart(document.getElementById('servicosChart'),{
    type:'doughnut',
    data:{
      labels:['Corte','Barba','Combo','Pigmentação','Hidratação','Relaxamento'],
      datasets:[{
        data:[35,25,20,8,7,5],
        backgroundColor:['#C8102E','#1A3A6B','#F5F5F5','#2a5298','#8b0d1e','#3d5a99'],
        borderColor:'#0A0A0A', borderWidth:3
      }]
    },
    options:{
      responsive:true, cutout:'65%',
      plugins:{legend:{position:'bottom',labels:{padding:12,boxWidth:12}}}
    }
  });

  // 3. Avaliações
  new Chart(document.getElementById('avaliacoesChart'),{
    type:'bar',
    data:{
      labels:['⭐','⭐⭐','⭐⭐⭐','⭐⭐⭐⭐','⭐⭐⭐⭐⭐'],
      datasets:[{
        label:'Qtd',
        data:[2,5,18,65,340],
        backgroundColor:['#444','#555','#666','#1A3A6B','#C8102E'],
        borderWidth:0, borderRadius:0
      }]
    },
    options:{
      responsive:true,indexAxis:'y',
      plugins:{legend:{display:false}},
      scales:{x:{grid:{color:'rgba(255,255,255,.05)'}},y:{grid:{display:false}}}
    }
  });

  // 4. Crescimento receita
  new Chart(document.getElementById('receitaChart'),{
    type:'line',
    data:{
      labels:['2020','2021','2022','2023','2024'],
      datasets:[{
        label:'Crescimento %',
        data:[0,12,28,47,71],
        borderColor:'#C8102E', backgroundColor:'rgba(200,16,46,.1)',
        pointBackgroundColor:'#C8102E', pointBorderColor:'#F5F5F5',
        pointRadius:5, borderWidth:2, fill:true, tension:.35
      },{
        label:'Meta',
        data:[0,15,30,50,80],
        borderColor:'rgba(26,58,107,.6)', backgroundColor:'transparent',
        pointRadius:0, borderWidth:1.5, borderDash:[6,4], tension:.35
      }]
    },
    options:{
      responsive:true,
      plugins:{legend:{labels:{boxWidth:12,padding:10}}},
      scales:{x:{grid:{color:'rgba(255,255,255,.05)'}},y:{grid:{color:'rgba(255,255,255,.05)'},ticks:{callback:v=>v+'%'}}}
    }
  });

  /* ── BOOKING BUTTON ── */
  $('#bookBtn').on('click',function(){
    let name=$('.booking-form input[type=text]').val().trim();
    if(!name){ alert('Por favor, preencha seu nome.'); return; }
    $(this).text('✓ Agendado! Confirmação via WhatsApp').css('background','#166534');
    setTimeout(()=>{ $(this).text('Confirmar Agendamento →').css('background',''); },3500);
  });
});