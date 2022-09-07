export const goToCadastro = (navigate) => {
    navigate('/')
}
export const goToLista = (navigate) => {
    navigate('/lista')
}
export const goToUpdate = (navigate, update) => {
    navigate(`/lista/${update}`)
}