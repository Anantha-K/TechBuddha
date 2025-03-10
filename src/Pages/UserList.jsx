import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, Edit } from 'lucide-react';
import toast from 'react-hot-toast';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://tech-buddha-server-0dge.onrender.com/members');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);



  const handleDelete = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    const deletingToast = toast.loading('Deleting user...');
    try {
      const response = await fetch(
        `https://tech-buddha-server-1.onrender.com/members/${userId}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      toast.success('User deleted successfully', { id: deletingToast });
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user', { id: deletingToast });
    }
  };

  const handleEdit = (fullname) => {
    const slug = fullname
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/\./g, '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    navigate(`/edit/${slug}`);
  };

  if(!loading && users.length === 0) {
    return (
        <div className="container min-h-screen mx-auto p-4 pt-24">
            <Card>
            <CardHeader>
                <CardTitle>No users found</CardTitle>
            </CardHeader>
            </Card>
        </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const getUserTypeColor = (userType) => {
    const colors = {
      college: 'bg-blue-100 text-blue-800',
      job: 'bg-green-100 text-green-800',
      marketing: 'bg-purple-100 text-purple-800',
      development: 'bg-orange-100 text-orange-800'
    };
    return colors[userType] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="container min-h-screen mx-auto p-4 pt-24">
      <Card>
        <CardHeader>
          <CardTitle>Users List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid bg-inherit grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map((user) => (
              <Card key={user._id} className="shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={user.imageUrl}
                      alt={user.fullname}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{user.fullname}</h3>
                      <span className={`inline-block px-2 py-1 rounded-full text-sm ${getUserTypeColor(user.userType)}`}>
                        {user.userType}
                      </span>
                      {user.collegename && (
                        <p className="text-sm text-gray-600 mt-1">{user.collegename}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-2 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(user.fullname)}
                      className="flex items-center space-x-1"
                    >
                      <Edit className="w-4 h-4" />
                      <span>Edit</span>
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(user._id)}
                      className="flex items-center space-x-1"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersList;
