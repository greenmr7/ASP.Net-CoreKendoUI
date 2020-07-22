using API.Models;
using API.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Repository.Interface
{
    public interface IDivisionRepository
    {
        Task<IEnumerable<DivisionVM>> getAll();
        DivisionVM getID(int Id);
        int Create(DivisionVM divisionVM, int id);
        int Update(DivisionVM divisionVM, int id);
        int Delete(int id);
    }
}
