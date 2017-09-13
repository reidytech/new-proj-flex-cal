var viewUpdate = {
    height: this.height,
    width: this.width,
    update: function(newHeight, newWidth){
        //triggerStyleChange(this.height, newHeight, this.width, newWidth);
        this.height = newHeight;
        this.width = newWidth;
    }
}

document.addEventListener('DOMContentLoaded', createElements);

window.addEventListener('resize', viewportFallBack);

function viewportFallBack() {
    var viewportwidth;
    var viewportheight;
    if(typeof window.innerWidth!='undefined') {
        viewportwidth=window.innerWidth,viewportheight=window.innerHeight
    }

    else if(typeof document.documentElement!='undefined'
            &&typeof document.documentElement.clientWidth!='undefined'
            &&document.documentElement.clientWidth!=0) {
                viewportwidth=document.documentElement.clientWidth,viewportheight=document.documentElement.clientHeight
    }

    else {
        viewportwidth=document.getElementsByTagName('body')[0].clientWidth,
        viewportheight=document.getElementsByTagName('body')[0].clientHeight
    }

    if(typeof viewUpdate.height === 'undefined' && typeof viewUpdate.width === 'undefined'){
        viewUpdate.height = viewportheight;
        viewUpdate.width = viewportwidth;
    }
    else if(viewUpdate.height && viewUpdate.width)
        viewUpdate.update(viewportheight, viewportwidth);        
    else
        console.log("Window dimension calculation resulted in an error.");
}

function createElements(){
    viewportFallBack();
    var centralDiv = document.createElement('div');
    var marginSides = `${viewUpdate.width * .2}px`;
    var marginTops = `${viewUpdate.height * .2}px`
    centralDiv.style.margin = marginTops + ' ' + marginSides + ' ' + marginTops + ' ' + marginSides;
    centralDiv.style.width = `${viewUpdate.width *.6}px`;
    centralDiv.style.height = `${viewUpdate.height*.6}px`;
    centralDiv.style.background = 'black';
    document.body.appendChild(centralDiv);
}

