import numpy as np, scipy.io.wavfile as w
from scipy.signal import butter, lfilter
SR=44100; D=31.8; N=int(SR*D); t=np.arange(N)/SR
def lp(x,f):b,a=butter(2,f/(SR/2));return lfilter(b,a,x)
def hp(x,f):b,a=butter(2,f/(SR/2),'high');return lfilter(b,a,x)
def env(n,a,r):
    e=np.ones(n);A=int(a*SR);R=int(r*SR)
    e[:A]=np.linspace(0,1,A);e[-R:]*=np.linspace(1,0,R);return e
def nf(m):return 440*2**((m-69)/12)
bpm=96;beat=60/bpm;bar=4*beat
chords=[[53,57,60,64],[57,60,64,67],[50,53,57,60],[48,52,55,59]]  # Fmaj7 Am7 Dm7 Cmaj7
music=np.zeros(N)
# pad
for i in range(int(D/bar)+1):
    c=chords[i%4];s=int(i*bar*SR);n=min(int(bar*SR*1.1),N-s)
    if n<=0:break
    tt=np.arange(n)/SR;seg=np.zeros(n)
    for m in c:
        f=nf(m);seg+=np.sin(2*np.pi*f*tt)+0.35*np.sin(2*np.pi*f*2.003*tt)+0.2*np.sin(2*np.pi*f*0.997*tt)
    music[s:s+n]+=0.05*seg*env(n,0.6,0.8)
# pluck arp 8ths from 4.4s
for k in range(int(D/(beat/2))):
    st=k*beat/2
    if st<4.4 or st>30.6:continue
    c=chords[int(st/bar)%4];m=c[k%4]+12;s=int(st*SR);n=min(int(0.5*SR),N-s);tt=np.arange(n)/SR
    music[s:s+n]+=0.06*(np.sin(2*np.pi*nf(m)*tt)+0.3*np.sin(2*np.pi*nf(m)*2*tt))*np.exp(-tt*9)
# kick + hat from 7.9
for k in range(int(D/beat)):
    st=k*beat
    if st<7.9 or st>28.6:continue
    s=int(st*SR);n=min(int(0.35*SR),N-s);tt=np.arange(n)/SR
    music[s:s+n]+=0.32*np.sin(2*np.pi*(45+80*np.exp(-tt*30))*tt)*np.exp(-tt*10)
    s2=int((st+beat/2)*SR);n2=min(int(0.06*SR),N-s2)
    if n2>0:music[s2:s2+n2]+=0.04*hp(np.random.default_rng(k).standard_normal(n2),7000)*np.exp(-np.arange(n2)/SR*60)
music=lp(music,9000)
music*=np.clip(t/1.0,0,1)*np.clip((D-t)/1.2,0,1)
# SFX
rng=np.random.default_rng(1);sfx=np.zeros(N)
def add(at,x,g=1):
    s=int(at*SR);n=min(len(x),N-s);sfx[s:s+n]+=g*x[:n]
def whoosh(d=0.45):
    n=int(d*SR);x=rng.standard_normal(n);tt=np.arange(n)/SR
    x=lp(x,1800)*np.sin(np.pi*tt/d)**2;return 0.5*x/np.abs(x).max()
def pop(f=900,d=0.12):
    tt=np.arange(int(d*SR))/SR;return 0.5*np.sin(2*np.pi*f*(1+2*np.exp(-tt*40))*tt)*np.exp(-tt*35)
def chime(fs=(1047,1319,1568),d=1.0):
    tt=np.arange(int(d*SR))/SR;x=sum(np.sin(2*np.pi*f*tt)*np.exp(-tt*(4+i)) for i,f in enumerate(fs));return 0.25*x
def click():
    tt=np.arange(int(0.03*SR))/SR;return 0.6*np.sin(2*np.pi*2200*tt)*np.exp(-tt*200)
def buzz():
    tt=np.arange(int(0.35*SR))/SR;return 0.18*np.sign(np.sin(2*np.pi*140*tt))*np.exp(-tt*6)
def thud():
    tt=np.arange(int(0.3*SR))/SR;return 0.6*np.sin(2*np.pi*(60+120*np.exp(-tt*25))*tt)*np.exp(-tt*12)
def riser(d=1.6):
    n=int(d*SR);tt=np.arange(n)/SR;x=lp(rng.standard_normal(n),3000)*(tt/d)**2;return 0.35*x/np.abs(x).max()
add(0.25,whoosh(0.7),.7);add(1.05,chime((2093,2637),0.5),.8);add(1.65,pop(800));add(3.0,buzz())
add(4.35,whoosh());add(4.7,pop(600));add(4.85,pop(700));add(5.0,pop(800))
add(7.9,click());add(8.05,click());add(8.4,chime());add(10.6,whoosh())
for i in range(3):add(11.85+i*0.45,pop(1200+i*150,0.08),.6)
for i in range(11):add(14.5+i*0.064,click(),.35)
for i in range(11):add(15.3+i*0.055,click(),.35)
add(16.05,click());add(16.4,pop(1000));add(16.9,chime((1568,2093),0.6),.7)
add(18.1,whoosh());add(19.4,whoosh(0.5),.6);add(20.7,whoosh(0.5),.6);add(21.3,chime((1319,1568,2093),0.9))
add(22.35,whoosh())
for i in range(3):add(22.45+i*0.25,pop(500+i*120),.7)
add(24.45,thud());add(26.6,riser(1.6),.8);add(28.2,thud(),1.0);add(28.3,chime((1047,1319,1568,2093),1.4),.9);add(29.2,pop(900))
w.write('bgm.wav',SR,(np.stack([music,music],1)/max(1e-9,np.abs(music).max())*0.8*32767).astype(np.int16))
w.write('sfx.wav',SR,(np.stack([sfx,sfx],1)/max(1e-9,np.abs(sfx).max())*0.9*32767).astype(np.int16))
print('ok')
