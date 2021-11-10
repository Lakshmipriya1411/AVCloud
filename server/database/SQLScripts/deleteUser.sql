DELIMITER $$

create procedure deleteUser(
	in _userId int
)
begin

	update user
	set status = 'cancelled'
	where user_id = _userID;

	update member
	set status = 'cancelled'
	where user_id = _userID;

    
end$$

DELIMITER ;
