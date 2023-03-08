function moveToPosition(start, distance, angle){
    const newPos = {
        x: start.x + distance * Math.cos(degToRad(angle)),
        y: start.y + distance * Math.sin(degToRad(angle)),
    }
    
    return newPos
}

function degToRad(degrees) {
    return degrees * Math.PI / 180;
}

function radToDeg(rad){
    return rad * 180 / Math.PI;
}

export function positionToCanvas(position){
    return 500 - position
}

export const drawCircle = (gameObject, ctx) => {
    ctx.beginPath();
    ctx.arc(gameObject.globalPosition.x, positionToCanvas(gameObject.globalPosition.y), gameObject.scale.w * 5, degToRad(0), degToRad(360), false);
    ctx.fill();
}

export function drawTriangle(gameObject, ctx){
    const tow = Math.atan(gameObject.scale.h/gameObject.scale.w)
    const omga = Math.PI - 2 * tow
    const alpha = ((2 * Math.PI - omga) / 2) / Math.PI * 180
    const R = gameObject.scale.h * 10 / 2
    const r = .5 * gameObject.scale.w * 10 / Math.cos(tow)

    ctx.beginPath();
    let newPos = moveToPosition(gameObject.globalPosition, R, gameObject.globalRotation)
    ctx.moveTo(newPos.x, positionToCanvas(newPos.y))
    newPos = moveToPosition(gameObject.globalPosition, r, gameObject.globalRotation + alpha)
    ctx.lineTo(newPos.x, positionToCanvas(newPos.y));
    newPos = moveToPosition(gameObject.globalPosition, r, gameObject.globalRotation - alpha)
    ctx.lineTo(newPos.x, positionToCanvas(newPos.y));
    newPos = moveToPosition(gameObject.globalPosition, R, gameObject.globalRotation)
    ctx.lineTo(newPos.x, positionToCanvas(newPos.y));
    ctx.fill();
}

export function drawRectangle(gameObject, ctx){
    let theta = Math.atan(gameObject.scale.h/ gameObject.scale.w)
    const R = .5 * gameObject.scale.h * 10 / Math.sin(theta)

    // ctx.fillStyle = color
    ctx.beginPath();
    let newPos = moveToPosition(gameObject.globalPosition, R, gameObject.globalRotation + radToDeg(theta))
    ctx.moveTo(newPos.x, positionToCanvas(newPos.y))
    newPos = moveToPosition(gameObject.globalPosition, R, gameObject.globalRotation + radToDeg(Math.PI - theta))
    ctx.lineTo(newPos.x, positionToCanvas(newPos.y));
    newPos = moveToPosition(gameObject.globalPosition, R, gameObject.globalRotation + radToDeg(Math.PI + theta))
    ctx.lineTo(newPos.x, positionToCanvas(newPos.y));
    newPos = moveToPosition(gameObject.globalPosition, R, gameObject.globalRotation - radToDeg(theta))
    ctx.lineTo(newPos.x, positionToCanvas(newPos.y));
    ctx.fill();
}

export function drawOutline(gameObject, ctx){
    ctx.strokeStyle = "red"
    switch (gameObject.shape) {
        case 'circle':
            ctx.beginPath();
            ctx.arc(gameObject.globalPosition.x, positionToCanvas(gameObject.globalPosition.y), gameObject.scale.w * 5, degToRad(0), degToRad(360), false);
            ctx.stroke()
            break;
        case 'rectangle':
            let theta = Math.atan(gameObject.scale.h/ gameObject.scale.w)
            const R = .5 * gameObject.scale.h * 10 / Math.sin(theta)
            ctx.beginPath();
            let newPos = moveToPosition(gameObject.globalPosition, R, gameObject.globalRotation + radToDeg(theta))
            ctx.moveTo(newPos.x, positionToCanvas(newPos.y))
            newPos = moveToPosition(gameObject.globalPosition, R, gameObject.globalRotation + radToDeg(Math.PI - theta))
            ctx.lineTo(newPos.x, positionToCanvas(newPos.y));
            newPos = moveToPosition(gameObject.globalPosition, R, gameObject.globalRotation + radToDeg(Math.PI + theta))
            ctx.lineTo(newPos.x, positionToCanvas(newPos.y));
            newPos = moveToPosition(gameObject.globalPosition, R, gameObject.globalRotation - radToDeg(theta))
            ctx.lineTo(newPos.x, positionToCanvas(newPos.y));
            newPos = moveToPosition(gameObject.globalPosition, R, gameObject.globalRotation + radToDeg(theta))
            ctx.lineTo(newPos.x, positionToCanvas(newPos.y))
            ctx.stroke()
            break;
        default:
            break;
    }
}