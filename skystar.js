// poem
var words=[
    '平芜尽处是春山',
    '爱情的开始',
    '你是猪',
    '曾照彩云归',
    '归去来兮',
    '徐县是猪',
    '徐县是猪',
    '徐县是猪',
    '徐县是猪',
    '一日不见兮',
    '思之若狂',
    '好想回到那个高三的夏天',
    '我们都活力四射',
    '偷偷想一个叫徐县的女孩',
    '你是我美好人生中的一道彩虹',
    '柳絮空缱绻',
    '南风知不知',
    '我见青山多妩媚',
    '料青山见我也应如是',
    '取次花丛懒回顾',
    '半缘修道半缘君',
    '三笑徒然当一痴',
    '人生若只如初见',
    '我余光中都是你',
    '人生自是有情痴',
    '此恨不关风与月',
    '因为你，我爱上了这个世界',
    '春蚕到死丝方尽',
    '蜡炬成灰泪始干',
    '今夜何夕',
    '见此良人',
    '愿我如星君如月',
    '夜夜流光相皎洁',
    '情不所起',
    '一往而深',
    '玲珑骰子安红豆',
    '入骨相思知不知',
    '多情只有春庭月',
    '尤为离人照落花',
    '若有知音见采',
    '不辞唱遍阳春',
    '休言半纸无多重',
    '万斛离愁尽耐担',
    '夜月一帘幽梦',
    '和光同尘',
    '杳霭流玉',
    '月落星沉',
    '霞姿月韵',
    '喜上眉梢',
    '醉后不知天在水',
    '满船星梦压星河',
    '落花人独立',
    '微雨燕双飞',
    '掬水月在手',
    '弄花香满衣',
    '夜深忽梦少年事',
    '唯梦闲人不梦君',
    '垆边人似月',
    '皓腕凝霜雪',
    '众里嫣然通一顾',
    '人间颜色如尘土',
    '若非群玉山头见',
    '会向瑶台月下逢',
    '沉鱼落雁鸟惊喧',
    '羞花闭月花愁颤',
    '今天是情人节',
    '我们节日快乐'
];
function randomNum(min,max){
    var num = (Math.random()*(max-min+1)+min).toFixed(2);
    return num;
}
function init(){
    let container = document.querySelector('.container');
    let f = document.createDocumentFragment();
    words.forEach(w=>{
    let word_box = document.createElement('div');
    let word = document.createElement('div');
        word.innerText = w;
        word.classList.add('word');
        word.style.color = '#BAABDA';
        word.style.fontFamily = '楷体';
        word.style.fontSize = '20px'
        word_box.classList.add('word-box');
        word_box.style.setProperty("--margin-top",randomNum(-40,20)+'vh');
        word_box.style.setProperty("--margin-left",randomNum(6,35)+'vw');
        word_box.style.setProperty("--animation-duration",randomNum(8,20)+'s');
        word_box.style.setProperty("--animation-delay",randomNum(-20,0)+'s');
        
        word_box.appendChild(word);
        f.appendChild(word_box);


    })
    container.appendChild(f);
}
window.addEventListener('load',init);
let textone = document.querySelector('.textone').querySelector('h1');
      let texttwo = document.querySelector('.texttwo').querySelector('h1');
      let textthree = document.querySelector('.textthree').querySelector('h1');

      setTimeout(function(){
        textone.innerHTML = '今晚，整片星空将为小县一人闪烁';
          textone.style.color = '#E8F9FD';
          textone.style.fontFamily = '楷体'
          texttwo.style.color = '#E8F9FD';
          texttwo.style.fontFamily = '楷体'
          textthree.style.color = '#E8F9FD';
          textthree.style.fontFamily = '楷体'
          texttwo.innerHTML = '';
      },28000)
      setTimeout(function(){
        textone.innerHTML = '从前从前,有个人爱你很久';
        texttwo.innerHTML = '但偏偏，风渐渐';
        textthree.innerHTML = '把距离吹的好远';
    },112500);

// === media controls: play/pause, volume, mute, fade-in ===
(function(){
    var audio = document.getElementById('bg-audio');
    var video = document.getElementById('videofilm');
    var playBtn = document.getElementById('play-btn');
    var volSlider = document.getElementById('vol-slider');
    var muteBtn = document.getElementById('mute-btn');
    var userStarted = false;
    var manualPause = false;
    var lastAutoAttempt = 0;
    var autoAttempts = 0;
    var maxAutoAttempts = 3;
    var autoCooldown = 5000; // ms between auto-resume cycles
    // expose minimal state for debug panel or other scripts
    window.__skystar_userStarted__ = window.__skystar_userStarted__ || false;
    window.__skystar_manualPause__ = window.__skystar_manualPause__ || false;
    var manualPause = false;

    function setVolumes(v){
        if(audio) audio.volume = v;
        if(video) video.volume = v;
    }

    function fadeInAudio(target, duration){
        if(!audio) return;
        var steps = 20;
        var stepTime = Math.max(10, Math.floor(duration/steps));
        var cur = 0;
        audio.volume = 0;
        var inc = target/steps;
        var t = setInterval(function(){
            cur += inc;
            if(cur >= target){
                audio.volume = target;
                clearInterval(t);
            } else {
                audio.volume = cur;
            }
        }, stepTime);
    }

    function togglePlayPause(){
        if(!userStarted){
            userStarted = true;
            manualPause = false;
            window.__skystar_userStarted__ = true;
            window.__skystar_manualPause__ = false;
            if(video && video.paused){ try{ video.play(); }catch(e){} }
            if(audio){
                audio.currentTime = 0;
                audio.volume = 0;
                audio.play().catch(()=>{});
                fadeInAudio(parseFloat(volSlider.value||0.8), 1600);
            }
            playBtn.textContent = '暂停';
            return;
        }

        if(audio && !audio.paused){
            audio.pause();
            manualPause = true;
            window.__skystar_manualPause__ = true;
            if(video && !video.paused) try{ video.pause(); }catch(e){}
            playBtn.textContent = '播放';
        } else {
            if(audio){ audio.play().catch(()=>{}); manualPause = false; window.__skystar_manualPause__ = false; }
            if(video) try{ video.play(); }catch(e){}
            playBtn.textContent = '暂停';
        }
    }

    function toggleMute(){
        if(!audio) return;
        audio.muted = !audio.muted;
        if(video) video.muted = audio.muted;
        muteBtn.textContent = audio.muted ? '取消静音' : '静音';
    }

    if(playBtn){ playBtn.addEventListener('click', togglePlayPause); }
    if(muteBtn){ muteBtn.addEventListener('click', toggleMute); }
    if(volSlider){ volSlider.addEventListener('input', function(e){
        var v = parseFloat(e.target.value);
        setVolumes(v);
        if(audio && audio.volume === 0 && userStarted){ fadeInAudio(v,800); }
    }); }

    // ensure UI reflects initial slider
    if(volSlider){ setVolumes(parseFloat(volSlider.value||0.8)); }

    // try to autoplay muted media on load (may be blocked by browser)
    function tryAutoplay(){
        try{
            if(audio){ audio.muted = true; audio.play().catch(()=>{}); }
            if(video){ video.muted = true; video.play().catch(()=>{}); }
        }catch(e){}
    }
    tryAutoplay();

    // optional: clicking anywhere will start media (helpful on mobile)
    document.addEventListener('click', function firstStart(e){
        if(userStarted) return;
        var target = e.target || window.event && window.event.target;
        if(target && (target.id==='play-btn' || target.id==='vol-slider' || target.id==='mute-btn')) return;
        if(playBtn) playBtn.click();
        document.removeEventListener('click', firstStart, {capture: true});
    }, {capture: true});

})();

// === in-page debug panel: capture errors, promise rejections and media events ===
(function(){
    function createDebugPanel(){
        if(document.getElementById('debug-log')) return;
        var d = document.createElement('div'); d.id = 'debug-log';
        var hdr = document.createElement('div'); hdr.className = 'dbg-header';
        var title = document.createElement('div'); title.className = 'title'; title.textContent = '调试日志';
        var closeBtn = document.createElement('button'); closeBtn.className = 'dbg-close'; closeBtn.textContent = '隐藏';
        hdr.appendChild(title); hdr.appendChild(closeBtn);
        var pre = document.createElement('div'); pre.className = 'dbg-pre'; pre.id = 'debug-pre';
        d.appendChild(hdr); d.appendChild(pre);
        document.body.appendChild(d);
        closeBtn.addEventListener('click', function(){ d.style.display = 'none'; });
    }

    function dbg(msg){
        console.log('[DEBUG PANEL] ' + msg);
        var p = document.getElementById('debug-pre');
        if(p){ p.textContent += (new Date()).toLocaleTimeString() + ' — ' + msg + '\n'; p.scrollTop = p.scrollHeight; }
    }

    createDebugPanel();

    window.addEventListener('error', function(e){
        dbg('Window error: ' + (e && e.message) + ' at ' + (e && e.filename) + ':' + (e && e.lineno));
    });
    window.addEventListener('unhandledrejection', function(e){ dbg('UnhandledRejection: ' + (e && e.reason)); });

    var audio = document.getElementById('bg-audio');
    var video = document.getElementById('videofilm');
    if(audio){
        audio.addEventListener('error', function(){
            var err = audio.error; dbg('Audio error: code=' + (err && err.code));
        });
        audio.addEventListener('play', function(){
            dbg('Audio: play event');
            // reset autoAttempts on successful play
            autoAttempts = 0;
            lastAutoAttempt = 0;
        });
        audio.addEventListener('pause', function(){
            dbg('Audio: pause event');
            // conservative auto-resume: only when not manually paused, within attempt limits and respecting cooldown
            var _manual = (typeof manualPause !== 'undefined') ? manualPause : !!window.__skystar_manualPause__;
            var _started = (typeof userStarted !== 'undefined') ? userStarted : !!window.__skystar_userStarted__;
            var now = Date.now();
            if(!_manual && _started && autoAttempts < maxAutoAttempts && (now - lastAutoAttempt) > autoCooldown){
                autoAttempts++;
                lastAutoAttempt = now;
                dbg('Auto-resume scheduled (attempt ' + autoAttempts + ')');
                // schedule a small series of retries but limited and spaced
                var tries = 0;
                var tryOnce = function(){
                    tries++;
                    dbg('Auto-resume try #' + tries + ' (global attempt ' + autoAttempts + ')');
                    audio.play().then(function(){ dbg('Auto-resume succeeded'); autoAttempts = 0; lastAutoAttempt = 0; }).catch(function(err){ dbg('Auto-resume failed: ' + err);
                        if(tries < 3 && audio.paused){
                            setTimeout(tryOnce, 600 * tries);
                        }
                    });
                };
                setTimeout(tryOnce, 500);
            }
        });
        audio.addEventListener('loadeddata', function(){ dbg('Audio: loadeddata'); });
    }
    if(video){
        video.addEventListener('error', function(){ var err = video.error; dbg('Video error: code=' + (err && err.code)); });
        video.addEventListener('loadeddata', function(){ dbg('Video: loadeddata'); });
        video.addEventListener('play', function(){ dbg('Video: play event'); });
    }

    // monitor network loading of source elements
    var sources = document.querySelectorAll('source');
    sources.forEach(function(s){
        s.addEventListener('error', function(){ dbg('Source failed to load: ' + (s.src || s.getAttribute('src'))); });
        // also log src
        dbg('Source present: ' + (s.src || s.getAttribute('src')));
    });

    // helpful tip
    dbg('若音频被浏览器阻止自动播放，请点击页面任意处或底部的播放按钮启动。');

})();


 
