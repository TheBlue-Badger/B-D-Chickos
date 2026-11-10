var CH="images/chicken.jpg",WA="27813935452";
function ld(k,d){try{var v=JSON.parse(localStorage.getItem(k));return v||d}catch(e){return d}}
function sv(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){alert("This device couldn’t save that (storage full or blocked).")}}
var DEF=[{id:1,name:"Whole chicken",price:90,unit:"each",desc:"Fresh, halaal and ready to cook. Roast it, curry it or pot it.",img:"chicken",ok:true},
{id:2,name:"Meaty bones",price:250,unit:"per box",desc:"Great value for soups, stews and stock. Full of flavour.",img:"",ok:true},
{id:3,name:"Breast fillets",price:85,unit:"1kg bag",desc:"Lean and quick to cook. Packed in 1kg bags.",img:"",ok:true}];
var P=ld("bd_p",DEF),O=ld("bd_o",[]),cart={};
function $(i){return document.getElementById(i)}
function esc(s){var d=document.createElement("div");d.textContent=s==null?"":s;return d.innerHTML}
function R(n){return"R"+Number(n).toFixed(0)}
function ph(t){var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="#e9d6a8"/><circle cx="200" cy="130" r="62" fill="#c4281c" opacity=".85"/><text x="200" y="140" font-family="Arial" font-weight="bold" font-size="34" fill="#fff" text-anchor="middle">B&amp;D</text><text x="200" y="250" font-family="Arial" font-size="20" fill="#5a2e1c" text-anchor="middle">'+t.replace(/[<>&"]/g,"")+' · photo coming soon</text></svg>';return"data:image/svg+xml;charset=utf-8,"+encodeURIComponent(s)}
function img(p){return p.img==="chicken"?CH:(p.img&&p.img.indexOf("data:")===0?p.img:ph(p.name))}
function shop(){var h="";P.forEach(function(p){h+='<div class="card'+(p.ok?"":" out")+'"><img src="'+img(p)+'" alt="'+esc(p.name)+'" loading="lazy"><div class="b"><span class="tag">Discounted</span><h3>'+esc(p.name)+'</h3><p>'+esc(p.desc)+'</p><div class="price">'+R(p.price)+(p.was?' <s>'+R(p.was)+'</s>':"")+' <small style="font-size:.85rem;font-weight:400;color:var(--muted)">'+esc(p.unit)+'</small></div>'+(p.ok?'<button class="btn s" data-add="'+p.id+'">Add to cart</button>':'<button class="btn s" disabled>Sold out</button>')+'</div></div>'});$("grid").innerHTML=h||"<p>New stock coming soon. WhatsApp us to ask what’s available.</p>"}
function drawCart(){var h="",t=0,c=0;P.forEach(function(p){var q=cart[p.id];if(q){t+=q*p.price;c+=q;h+='<div class="line"><span>'+esc(p.name)+'<br><small>'+R(p.price)+' '+esc(p.unit)+'</small></span><span class="q"><button data-m="'+p.id+'" aria-label="Remove one">−</button> '+q+' <button data-p="'+p.id+'" aria-label="Add one">+</button></span></div>'}});
$("cl").innerHTML=h||"<p>Your cart is empty. Add something from the stock list.</p>";$("ct").innerHTML=c?"Total: "+R(t)+" · delivery free":"";$("co").style.display=c?"block":"none";$("cc").textContent=c}
document.addEventListener("click",function(e){var b=e.target.closest("button,a");if(!b)return;var d=b.dataset;
if(d.add||d.p){cart[d.add||d.p]=(cart[d.add||d.p]||0)+1;drawCart();if(d.add)$("drawer").classList.add("on")}
if(d.m){cart[d.m]--;if(cart[d.m]<=0)delete cart[d.m];drawCart()}});
$("cartbtn").onclick=function(){$("drawer").classList.add("on")};$("cx").onclick=function(){$("drawer").classList.remove("on")};
$("wa1").href="https://wa.me/"+WA+"?text="+encodeURIComponent("Hi B&D Chickos, I’d like to ask about your stock.");
$("send").onclick=function(){var n=$("n").value.trim(),p=$("p").value.trim(),a=$("a").value.trim();if(!n||!p||!a){alert("Please fill in your name, phone number and address.");return}
var items=[],t=0;P.forEach(function(x){var q=cart[x.id];if(q){items.push({id:x.id,name:x.name,unit:x.unit,qty:q,price:x.price});t+=q*x.price}});if(!items.length)return;
O.unshift({id:Date.now(),date:new Date().toLocaleString(),name:n,phone:p,addr:a,items:items,total:t,status:"New"});sv("bd_o",O);
var m="New order from "+n+"\n"+items.map(function(i){return i.qty+" x "+i.name+" ("+i.unit+") = "+R(i.qty*i.price)}).join("\n")+"\nTotal: "+R(t)+" (free delivery, cash on delivery)\nPhone: "+p+"\nAddress: "+a;
cart={};drawCart();$("drawer").classList.remove("on");window.open("https://wa.me/"+WA+"?text="+encodeURIComponent(m),"_blank")};
/* admin */
function route(){var a=location.hash==="#admin";$("store").style.display=a?"none":"block";$("admin").style.display=a?"block":"none";if(a)adm()}
window.addEventListener("hashchange",route);
var authed=false;function pw(){return ld("bd_pw","bdchickos")}
$("li").onclick=function(){if($("pw").value===pw()){authed=true;$("pw").value="";adm()}else $("le").textContent="That password isn’t right. Try again."};
$("lo").onclick=function(){authed=false;adm()};
$("sp").onclick=function(){var v=$("np").value;if(v.length<6){alert("Use at least 6 characters.");return}sv("bd_pw",v);$("np").value="";alert("Password saved on this device.")};
document.querySelectorAll("[data-t]").forEach(function(b){b.onclick=function(){document.querySelectorAll("[data-t]").forEach(function(x){x.classList.toggle("on",x===b);$("t-"+x.dataset.t).style.display=x===b?"block":"none"});adm()}});
function adm(){$("login").style.display=authed?"none":"block";$("panel").style.display=authed?"block":"none";if(!authed)return;
$("sb").innerHTML=P.map(function(p,i){return'<tr><td>'+esc(p.name)+'</td><td><input type="number" min="0" value="'+p.price+'" data-pr="'+i+'" style="width:90px"></td><td>'+esc(p.unit)+'</td><td><select data-st="'+i+'"><option value="1"'+(p.ok?" selected":"")+'>In stock</option><option value="0"'+(p.ok?"":" selected")+'>Sold out</option></select></td><td><button class="btn o s" data-rm="'+i+'">Remove</button></td></tr>'}).join("");
$("ol").innerHTML=O.length?O.map(function(o,i){return'<div class="card" style="margin-bottom:10px"><div class="b"><b>'+esc(o.name)+'</b> · '+esc(o.phone)+'<br>'+esc(o.addr)+'<br><small>'+esc(o.date)+'</small>'+o.items.map(function(x){return'<div>'+x.qty+' × '+esc(x.name)+'</div>'}).join("")+'<b>'+R(o.total)+'</b><select data-os="'+i+'">'+["New","Out for delivery","Delivered","Cancelled"].map(function(s){return'<option'+(s===o.status?" selected":"")+'>'+s+'</option>'}).join("")+'</select></div></div>'}).join(""):"<p>No orders yet. Orders sent from this device’s shop will show up here.</p>";
var d=O.filter(function(o){return o.status==="Delivered"}),rev=d.reduce(function(s,o){return s+o.total},0),by={};d.forEach(function(o){o.items.forEach(function(x){by[x.name]=(by[x.name]||0)+x.qty})});
$("ss").innerHTML='<div><b>'+R(rev)+'</b>Delivered sales</div><div><b>'+O.length+'</b>Orders in total</div><div><b>'+O.filter(function(o){return o.status==="New"}).length+'</b>New orders</div>'+Object.keys(by).map(function(k){return'<div><b>'+by[k]+'</b>'+esc(k)+' sold</div>'}).join("")}
document.addEventListener("change",function(e){var d=e.target.dataset;if(d.pr!==undefined){P[d.pr].price=Number(e.target.value)||0}else if(d.st!==undefined){P[d.st].ok=e.target.value==="1"}else if(d.os!==undefined){O[d.os].status=e.target.value;sv("bd_o",O);adm();return}else return;sv("bd_p",P);shop();drawCart();adm()});
document.addEventListener("click",function(e){var i=e.target.dataset.rm;if(i!==undefined&&confirm("Remove "+P[i].name+" from the shop?")){P.splice(i,1);sv("bd_p",P);shop();adm()}});
$("add").onclick=function(){var n=$("an").value.trim(),pr=Number($("ap").value);if(!n||!pr){alert("Add a name and a price.");return}
function fin(im){P.push({id:Date.now(),name:n,price:pr,unit:$("au").value.trim()||"each",was:Number($("aw").value)||0,desc:$("ad").value.trim(),img:im||"",ok:true});sv("bd_p",P);["an","ap","au","aw","ad","ai"].forEach(function(k){$(k).value=""});shop();adm()}
var f=$("ai").files[0];if(!f){fin("");return}var r=new FileReader();r.onload=function(){var im=new Image();im.onload=function(){var c=document.createElement("canvas"),s=Math.min(1,600/im.width);c.width=im.width*s;c.height=im.height*s;c.getContext("2d").drawImage(im,0,0,c.width,c.height);fin(c.toDataURL("image/jpeg",.8))};im.src=r.result};r.readAsDataURL(f)};
shop();drawCart();route();
