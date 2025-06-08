package br.com.decarli.bean.estudante;

import br.com.decarli.model.Estudante;

import javax.enterprise.context.RequestScoped;
import javax.inject.Named;
import java.io.Serializable;
import java.util.*;

import static java.util.Arrays.asList;

@Named
@RequestScoped
public class EstudanteBean implements Serializable {

    private Estudante estudante = new Estudante();
    private String[] nomesArray = {"Eduardo", "Gaspar", "Matheus"};
    private List<String> cursosList = asList("TI", "Medicina", "Farmacologia", "Psicologia");
    private Set<String> professoresSet = new HashSet<>(asList("Rodrigo", "Ronaldo", "Kaio"));
    private Map<Integer, String> coordenadores = new HashMap<>();

    {
        coordenadores.put(1, "Marcos");
        coordenadores.put(2, "Carlos");
        coordenadores.put(3, "Joelma");
    }

    // Métodos

    public void executar() {
        System.out.println("Realizando busca no banco de dados");
        System.out.println("Processando os dados");
        System.out.println("Exibindo os dados");
    }

    public void executar(String parametro) {
        System.out.println("Realizando busca no banco de dados com base no parametro " + parametro);
        System.out.println("Processando os dados");
        System.out.println("Exibindo os dados");
    }

    public String executarReturnString(String parametro) {
        return "O melhor aluno da turma é o " + parametro;
    }

    public String irParaPaginaCoordenadores() {
        return "coordenadores?faces-redirect=true";
    }

    // Getters and Setters

    public Estudante getEstudante() {
        return estudante;
    }

    public void setEstudante(Estudante estudante) {
        this.estudante = estudante;
    }

    public String[] getNomesArray() {
        return nomesArray;
    }

    public void setNomesArray(String[] nomesArray) {
        this.nomesArray = nomesArray;
    }

    public List<String> getCursosList() {
        return cursosList;
    }

    public void setCursosList(List<String> cursosList) {
        this.cursosList = cursosList;
    }

    public Set<String> getProfessoresSet() {
        return professoresSet;
    }

    public void setProfessoresSet(Set<String> professoresSet) {
        this.professoresSet = professoresSet;
    }

    public Map<Integer, String> getCoordenadores() {
        return coordenadores;
    }

    public void setCoordenadores(Map<Integer, String> coordenadores) {
        this.coordenadores = coordenadores;
    }
}
