export const formatDateForInput = (date: Date | string | undefined | null): string => {
  if (!date) return '';
  
  try {
    let dateObj: Date;
    
    if (date instanceof Date) {
      dateObj = date;
    } else if (typeof date === 'string') {
      dateObj = new Date(date);
    } else {
      return '';
    }
    
    // Verificar se a data é válida
    if (isNaN(dateObj.getTime())) {
      return '';
    }
    
    // Formato YYYY-MM-DD para input date
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  } catch (error) {
    console.error('Erro ao formatar data:', error);
    return '';
  }
};

export const parseInputDate = (value: string): Date | null => {
  if (!value) return null;
  
  try {
    const date = new Date(value + 'T00:00:00');
    
    if (isNaN(date.getTime())) {
      return null;
    }
    
    return date;
  } catch (error) {
    console.error('Erro ao parsear data:', error);
    return null;
  }
};