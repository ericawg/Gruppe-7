import { connection } from './mysql_connection';

class StudentService {
  getStudents(success) {
    connection.query('select * from Students', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  getStudent(id, success) {
    connection.query('select * from Students where id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }

  updateStudent(student, success) {
    connection.query(
      'update Students set name=?, email=? where id=?',
      [student.name, student.email, student.id],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }
  addStudent(navn,email){
    connection.query('insert into Students set name=?,email=?', [navn, email],(error,results) => {
      if(error) return console.error(error);
    });
  }
}
export let studentService = new StudentService();

class EmneService {
  getEmner(success) {
    connection.query('select * from Emne', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  getEmne(id, success) {
    connection.query('select * from Emne where emne_kode=?', [id], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }

  updateEmne(emne, success) {
    connection.query(
      'update Emne set emne_navn=?, emne_kode=?',
      [emne.emne_navn, emne.emne_kode],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }
  addEmne(emne_navn,emne_kode){
    connection.query('insert into Emne set emne_navn=?, emne_kode=?', [emne_navn, emne_kode],(error,results) => {
      if(error) return console.error(error);

    });
  }
}
export let emneService = new EmneService();
