from app.models.collections import update_collection_status

def progress_collection_case(cur, case_id, new_status, notes=None):

    update_collection_status(cur, case_id, new_status, notes)

    print(f"Collection case {case_id} updated to {new_status}")