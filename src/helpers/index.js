const colorType = (type)=>{
    let color = ''

    switch(type){
      case 'grass': color='bg-green-300'
        break;
      case 'poison': color='bg-violet-600'
        break;
      case 'flying': color='bg-sky-300'
        break;
      case 'bug': color='bg-teal-500'
        break;
      case 'fire': color='bg-red-500'
        break;
      case 'water': color='bg-blue-600'
        break;
      case 'ground': color='bg-amber-800'
        break
      case 'electric': color='bg-amber-300'
        break;
      case 'fairy': color='bg-pink-400'
        break;
      default: color='bg-slate-400'
        break;
    }

    return color
  }

  export default colorType