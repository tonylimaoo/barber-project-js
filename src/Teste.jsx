import React from 'react'

const Teste = () => {

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log("Testando")
    
    console.log(e.target.getAttributeNames())

    e.target.querySelector('input').setAttribute('disabled','')
  }
  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)} teste='teste'>
        <input type="submit" value="Botão Teste" />
      </form>
    </div>
  )
}

export default Teste